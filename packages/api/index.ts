/// <reference types="./worker-configuration.d.ts" />

import { drizzle, DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";
import { DurableObject } from "cloudflare:workers";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import migrations from "./drizzle/migrations";
import { createClient } from "@openauthjs/openauth/client";
import {
  subjects,
  authUrl,
  authClientID,
  type SubjectUser,
} from "@nuxflare-chat/common/auth";
import * as schema from "./schema";
import { sql } from "drizzle-orm";
import * as v from "valibot";
import { PushEvent, SyncEvent, PushEventSchema } from "./types";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

let _client: ReturnType<typeof createClient>;
const getClient = () => {
  if (_client) return _client;
  return (_client = createClient({
    // TODO: update these to read from env, also make sure cert gets memoized correctly in worker?
    issuer: authUrl,
    clientID: authClientID,
  }));
};

const verifyRequest = async (req: Request) => {
  const token =
    req.headers
      .get("sec-websocket-protocol")
      ?.split(",")
      .map((x) => x.trim())[0] ||
    req.headers.get("authentication")?.slice("Bearer ".length) ||
    "";
  const client = getClient();
  const verified = await client.verify(subjects, token);
  if (verified.err) throw "token verification error";
  return verified.subject.properties;
};

// TODO:
// reauthentication for live connection? access token expiry and so on.
// logout from other devices?

export class User extends DurableObject {
  storage: DurableObjectStorage;
  db: DrizzleSqliteDODatabase<typeof schema>;
  clock: number;
  user: SubjectUser;
  env: Env;
  miniBucket: any;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.storage = ctx.storage;
    this.env = env;
    this.db = drizzle(this.storage, { logger: false, schema });
    ctx.blockConcurrencyWhile(async () => {
      this.clock = (await this.storage.get<number>("clock")) || 0;
      await this.#migrate();
      this.ctx.setWebSocketAutoResponse(
        new WebSocketRequestResponsePair("ping", "pong"),
      );
    });
  }

  #tick(inc = 1) {
    this.clock += inc;
    this.storage.put("clock", this.clock);
    return this.clock;
  }

  #sendEvents(events: SyncEvent[]) {
    const websockets = this.ctx.getWebSockets();
    // TODO: batch objects?
    for (const ws of websockets) {
      for (const event of events) {
        ws.send(JSON.stringify(event));
      }
    }
  }

  async #getBlob(id: string) {
    return await this.env.BLOB.get(id);
  }

  async fetch(request: Request): Promise<Response> {
    const app = new Hono<{ Bindings: Env }>();
    app.use(async (c, next) => {
      try {
        this.user = await verifyRequest(c.req.raw);
        await next();
      } catch {
        return c.text("", 403);
      }
    });
    app.get("/pull", async (c) => {
      const clockParam = c.req.query("clock");
      const clock = typeof clockParam === "string" ? Number(clockParam) : -1;
      const [threads, messages, kvs] = await Promise.all([
        this.db.query.threads.findMany({
          where: (threads, { gt }) => gt(threads.clock, clock),
        }),
        this.db.query.messages.findMany({
          where: (messages, { gt }) => gt(messages.clock, clock),
        }),
        this.db.query.kv.findMany({
          where: (kv, { gt }) => gt(kv.clock, clock),
        }),
      ]);
      return c.json({ threads, messages, kvs });
    });
    app.post("/push", async (c) => {
      const { id: _requestId, events } = await v.parseAsync(
        PushEventSchema,
        c.req.json(),
      );
      this.#processEvents(events);
    });
    app.all("*", (c) => {
      if (c.req.header("Upgrade") === "websocket") {
        const webSocketPair = new WebSocketPair();
        const [clientWs, serverWs] = Object.values(webSocketPair);
        if (serverWs) {
          this.ctx.acceptWebSocket(serverWs);
        }
        const res = new Response(null, { status: 101, webSocket: clientWs });
        res.headers.set("sec-websocket-protocol", "nuxflare-chat");
        return res;
      }
      return c.text("", 400);
    });
    return app.fetch(request, this.env);
  }

  async #processEvents(events: PushEvent["events"]) {
    const syncEvents: SyncEvent[] = [];
    try {
      for (const event of events) {
        if (event.type === "new_thread") {
          const { id, title, parent_thread_id } = event.data;
          const clock = this.#tick();
          const thread = this.db
            .insert(schema.threads)
            .values({
              id,
              title: title || "New Thread",
              parent_thread_id,
              clock,
              deleted: false,
              pinned: false,
            })
            .returning()
            .get();
          syncEvents.push({
            type: "thread",
            clock,
            data: thread,
          });
        } else if (event.type === "update_thread") {
          const { id, title, deleted, pinned } = event.data;
          const clock = this.#tick();
          const thread = this.db
            .update(schema.threads)
            .set({
              ...(title !== undefined && {
                title,
              }),
              ...(deleted !== undefined && {
                deleted: deleted,
              }),
              ...(pinned !== undefined && {
                pinned: pinned,
              }),
              clock,
            })
            .where(sql`id = ${id}`)
            .returning()
            .get();
          if (thread) {
            syncEvents.push({
              type: "thread",
              clock,
              data: thread,
            });
          }
        } else if (event.type === "new_message") {
          const { id, data, role, threadId } = event.data;
          // TODO: do we want to let database do this with foreign keys?
          const thread = await this.db.query.threads.findFirst({
            where: (threads, { eq }) => eq(threads.id, threadId),
          });
          if (!thread) continue;

          const maxIndexResult = await this.db.query.messages.findFirst({
            where: (messages, { eq, and, eq: equal }) =>
              and(
                eq(messages.thread_id, threadId),
                equal(messages.deleted, false),
              ),
            orderBy: (messages, { desc }) => [desc(messages.index)],
          });
          const nextIndex = (maxIndexResult?.index ?? -1) + 1;

          const clock = this.#tick();
          const message = this.db
            .insert(schema.messages)
            .values({
              id,
              thread_id: threadId,
              data,
              role,
              index: nextIndex,
              clock,
              deleted: false,
            })
            .returning()
            .get();
          syncEvents.push({
            type: "message",
            clock,
            data: message,
          });
          const threadClock = this.#tick();
          const updatedThread = this.db
            .update(schema.threads)
            .set({
              last_message_at: message.updated_at,
              clock: threadClock,
            })
            .where(sql`id = ${threadId}`)
            .returning()
            .get();
          if (updatedThread) {
            syncEvents.push({
              type: "thread",
              clock: threadClock,
              data: updatedThread,
            });
          }
        } else if (event.type === "update_message") {
          const { id, data, deleted } = event.data;
          const clock = this.#tick();
          const message = this.db
            .update(schema.messages)
            .set({
              ...(data !== undefined && { data: data }),
              ...(deleted !== undefined && {
                deleted: deleted,
              }),
              clock,
            })
            .where(sql`id = ${id}`)
            .returning()
            .get();
          if (message) {
            syncEvents.push({
              type: "message",
              clock,
              data: message,
            });
            const threadClock = this.#tick();
            const updatedThread = this.db
              .update(schema.threads)
              .set({
                last_message_at: message.updated_at,
                clock: threadClock,
              })
              .where(sql`id = ${message.thread_id}`)
              .returning()
              .get();
            if (updatedThread) {
              syncEvents.push({
                type: "thread",
                clock: threadClock,
                data: updatedThread,
              });
            }
          }
        } else if (event.type === "run_thread") {
          const { threadId, messageId, options } = event.data;

          const currentThread = await this.db.query.threads.findFirst({
            where: (threads, { eq }) => eq(threads.id, threadId),
          });
          if (!currentThread) continue;
          if (currentThread.status === "streaming") continue;

          const streamId = crypto.randomUUID();

          let messages = await this.db.query.messages.findMany({
            where: (messages, { eq, and, eq: equal }) =>
              and(
                eq(messages.thread_id, threadId),
                equal(messages.deleted, false),
              ),
            orderBy: (messages, { asc }) => [
              asc(messages.index),
              asc(messages.created_at),
            ],
          });

          if (messageId) {
            const retryMessage = messages.find((msg) => msg.id === messageId);
            if (retryMessage) {
              messages = messages.filter(
                (msg) => msg.index < retryMessage.index,
              );
            }
          }

          const formattedMessages = await Promise.all(
            messages.map(async (msg: any) => {
              const data = msg.data;
              const content: any[] = [];
              if (data?.content) {
                content.push({ type: "text", text: data.content });
              }
              if (data?.attachments) {
                for (const attachment of data.attachments) {
                  const blob = await this.#getBlob(attachment.id);
                  const isPDF = attachment.type === "application/pdf";
                  if (blob) {
                    content.push({
                      type: isPDF ? "file" : "image",
                      ...(isPDF
                        ? {
                            data: await blob.arrayBuffer(),
                            mimeType: attachment.type,
                          }
                        : { image: await blob.arrayBuffer() }),
                    });
                  }
                }
              }
              return {
                role: msg.role,
                content,
              };
            }),
          );

          let message: any;
          let messageIdToUse: string;

          if (messageId) {
            messageIdToUse = messageId;
            const clock = this.#tick();
            message = this.db
              .update(schema.messages)
              .set({
                data: { content: "" },
                stream_id: streamId,
                clock,
              })
              .where(sql`id = ${messageId}`)
              .returning()
              .get();
          } else {
            messageIdToUse = crypto.randomUUID();
            const maxIndexResult = await this.db.query.messages.findFirst({
              where: (messages, { eq, and, eq: equal }) =>
                and(
                  eq(messages.thread_id, threadId),
                  equal(messages.deleted, false),
                ),
              orderBy: (messages, { desc }) => [desc(messages.index)],
            });
            const nextIndex = (maxIndexResult?.index ?? -1) + 1;

            const clock = this.#tick();
            message = this.db
              .insert(schema.messages)
              .values({
                id: messageIdToUse,
                thread_id: threadId,
                role: "assistant",
                data: { content: "" },
                stream_id: streamId,
                index: nextIndex,
                clock,
                deleted: false,
              })
              .returning()
              .get();
          }

          if (message) {
            syncEvents.push({
              type: "message",
              clock: message.clock,
              data: message,
            });
          }

          const threadClock = this.#tick();
          const updatedThread = this.db
            .update(schema.threads)
            .set({
              status: "streaming",
              last_message_at: message.updated_at,
              clock: threadClock,
            })
            .where(sql`id = ${threadId}`)
            .returning()
            .get();

          if (updatedThread) {
            syncEvents.push({
              type: "thread",
              clock: threadClock,
              data: updatedThread,
            });
          }
          this.#sendEvents(syncEvents);

          const streamBinding = this.env.STREAM;
          const streamStub = streamBinding.get(
            streamBinding.idFromName(streamId),
          );

          (async () => {
            try {
              const [
                openrouterApiKey,
                geminiApiKey,
                openaiApiKey,
                anthropicApiKey,
              ] = await Promise.all([
                this.db.query.kv.findFirst({
                  where: (kv, { eq }) => eq(kv.name, "openrouter_api_key"),
                }),
                this.db.query.kv.findFirst({
                  where: (kv, { eq }) => eq(kv.name, "gemini_api_key"),
                }),
                this.db.query.kv.findFirst({
                  where: (kv, { eq }) => eq(kv.name, "openai_api_key"),
                }),
                this.db.query.kv.findFirst({
                  where: (kv, { eq }) => eq(kv.name, "anthropic_api_key"),
                }),
              ]);
              const keys = {
                openrouter: openrouterApiKey?.value || "",
                gemini: geminiApiKey?.value || "",
                openai: openaiApiKey?.value || "",
                anthropic: anthropicApiKey?.value || "",
              };
              const response = await streamStub.init(
                formattedMessages,
                options,
                keys,
              );
              const syncEvents: SyncEvent[] = [];
              const finalClock = this.#tick();
              const updatedMessage = this.db
                .update(schema.messages)
                .set({
                  data: { content: response, modelOptions: options },
                  stream_id: null,
                  error: null,
                  clock: finalClock,
                })
                .where(sql`id = ${messageIdToUse}`)
                .returning()
                .get();
              if (updatedMessage) {
                syncEvents.push({
                  type: "message",
                  clock: finalClock,
                  data: updatedMessage,
                });
              }

              const finalThreadClock = this.#tick();
              const finalThread = this.db
                .update(schema.threads)
                .set({
                  status: "ready",
                  clock: finalThreadClock,
                })
                .where(sql`id = ${threadId}`)
                .returning()
                .get();
              if (finalThread) {
                syncEvents.push({
                  type: "thread",
                  clock: finalThreadClock,
                  data: finalThread,
                });
              }
              this.#sendEvents(syncEvents);
            } catch (error) {
              const syncEvents: SyncEvent[] = [];

              let partialResponse = "";
              try {
                partialResponse = await streamStub.getPartialResponse();
              } catch (e) {
                console.error("Error getting partial response:", e);
              }

              // TODO: handle more specific error messages?
              const errorClock = this.#tick();
              const errorMessage = this.db
                .update(schema.messages)
                .set({
                  data: { content: partialResponse },
                  error: JSON.stringify({
                    type: "StreamError",
                    message: "An error occurred while generating the message",
                  }),
                  stream_id: null,
                  clock: errorClock,
                })
                .where(sql`id = ${messageIdToUse}`)
                .returning()
                .get();
              if (errorMessage) {
                syncEvents.push({
                  type: "message",
                  clock: errorClock,
                  data: errorMessage,
                });
              }

              const finalThreadClock = this.#tick();
              const finalThread = this.db
                .update(schema.threads)
                .set({
                  status: "ready",
                  clock: finalThreadClock,
                })
                .where(sql`id = ${threadId}`)
                .returning()
                .get();
              if (finalThread) {
                syncEvents.push({
                  type: "thread",
                  clock: finalThreadClock,
                  data: finalThread,
                });
              }

              this.#sendEvents(syncEvents);
            }
          })();
        } else if (event.type === "stop_thread") {
          // TODO: Implement stop_thread logic
        } else if (event.type === "branch_thread") {
          const { threadId, messageId, newThreadId } = event.data;

          const sourceThread = await this.db.query.threads.findFirst({
            where: (threads, { eq }) => eq(threads.id, threadId),
          });
          if (!sourceThread) continue;
          const branchMessage = await this.db.query.messages.findFirst({
            where: (messages, { eq }) => eq(messages.id, messageId),
          });
          if (!branchMessage) continue;

          const messagesToCopy = await this.db.query.messages.findMany({
            where: (messages, { eq, and, lte, eq: equal }) =>
              and(
                eq(messages.thread_id, threadId),
                lte(messages.index, branchMessage.index),
                equal(messages.deleted, false),
              ),
            orderBy: (messages, { asc }) => [
              asc(messages.index),
              asc(messages.created_at),
            ],
          });

          const threadClock = this.#tick();
          const newThread = this.db
            .insert(schema.threads)
            .values({
              id: newThreadId,
              title: sourceThread.title,
              parent_thread_id: threadId,
              clock: threadClock,
              deleted: false,
              pinned: false,
            })
            .returning()
            .get();

          syncEvents.push({
            type: "thread",
            clock: threadClock,
            data: newThread,
          });

          for (const message of messagesToCopy) {
            const newMessageId = crypto.randomUUID();
            const messageClock = this.#tick();
            const copiedMessage = this.db
              .insert(schema.messages)
              .values({
                id: newMessageId,
                thread_id: newThreadId,
                data: message.data,
                role: message.role,
                index: message.index,
                clock: messageClock,
                deleted: false,
                created_at: message.created_at,
                error: message.error,
              })
              .returning()
              .get();

            syncEvents.push({
              type: "message",
              clock: messageClock,
              data: copiedMessage,
            });
          }
          if (messagesToCopy.length > 0) {
            const lastMessage = messagesToCopy[messagesToCopy.length - 1];
            const finalThreadClock = this.#tick();
            const updatedNewThread = this.db
              .update(schema.threads)
              .set({
                last_message_at: lastMessage.updated_at,
                clock: finalThreadClock,
              })
              .where(sql`id = ${newThreadId}`)
              .returning()
              .get();
            if (updatedNewThread) {
              syncEvents.push({
                type: "thread",
                clock: finalThreadClock,
                data: updatedNewThread,
              });
            }
          }
        } else if (event.type === "set_kv") {
          const { name, value } = event.data;
          const clock = this.#tick();
          const kv = this.db
            .insert(schema.kv)
            .values({
              id: crypto.randomUUID(),
              name,
              value,
              clock,
            })
            .onConflictDoUpdate({
              target: schema.kv.name,
              set: {
                value,
                clock,
                updated_at: sql`(unixepoch())`,
              },
            })
            .returning()
            .get();
          syncEvents.push({
            type: "kv",
            clock,
            data: kv,
          });
        }
      }
    } finally {
      // TODO: compression?
      if (syncEvents.length > 0) {
        this.#sendEvents(syncEvents);
      }
    }
  }

  async webSocketMessage(_ws: WebSocket, msgBuffer: ArrayBuffer | string) {
    const msgString = msgBuffer.toString();
    try {
      const msgObj = JSON.parse(msgString);
      const { id: _requestId, events } = await v.parseAsync(
        PushEventSchema,
        msgObj,
      );
      this.#processEvents(events);
    } catch (err) {
      console.error("Message processing error:", err);
    }
  }

  async #migrate() {
    await migrate(this.db, migrations);
  }
}

export class Stream extends DurableObject {
  ctx: DurableObjectState;
  env: Env;
  response: string;
  done: boolean;
  activeStreams: any[]; // TODO: type
  initialized: boolean;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.ctx = ctx;
    this.env = env;
    this.response = "";
    this.activeStreams = [];
    this.done = false;
    this.initialized = false;
  }

  async init(messages: any[], options: any = {}, keys: Record<string, string>) {
    this.initialized = true;
    this.response = "";
    try {
      const getModel = (name: string) => {
        // use base model name for provider specific api keys
        const baseModelName = name.match(/.*\/([^:]*):?.*/)?.[1] || "";
        if (name.startsWith("google/") && keys.gemini) {
          return createGoogleGenerativeAI({ apiKey: keys.gemini })(
            baseModelName,
          );
        }
        if (name.startsWith("openai/") && keys.openai) {
          return createOpenAI({ apiKey: keys.openai })(baseModelName);
        }
        if (name.startsWith("anthropic/") && keys.anthropic) {
          return createAnthropic({ apiKey: keys.anthropic })(baseModelName);
        }
        if (!keys.openrouter) throw new Error("openrouter_api_key is required");
        return createOpenRouter({ apiKey: keys.openrouter });
      };

      const streamConfig: any = {
        model: getModel(options.name),
        messages,
        onError: (error: any) => {
          for (const controller of this.activeStreams) {
            try {
              controller.close();
            } catch (e) {
              console.error("Error closing stream", e);
            }
          }
          this.activeStreams = [];
          this.done = true;
          throw error;
        },
      };
      const res = streamText(streamConfig);
      const { textStream } = res;
      for await (const part of textStream) {
        this.response += part;
        for (const controller of this.activeStreams) {
          try {
            controller.enqueue(part);
          } catch {}
        }
      }
      for (const controller of this.activeStreams) {
        try {
          controller.close();
        } catch {}
      }
      this.activeStreams = [];
      this.done = true;
    } catch (error) {
      console.log("stream error", error);
      for (const controller of this.activeStreams) {
        try {
          controller.error(error);
        } catch {}
      }
      this.activeStreams = [];
      this.done = true;
      throw error;
    }
    // TODO: should we return response like this or have the DO do a async callback.
    return this.response;
  }

  async getPartialResponse() {
    return this.response;
  }

  async fetch(request: Request) {
    if (!this.initialized) return new Response(null, { status: 404 });
    try {
      if (this.done) {
        return new Response(this.response);
      }
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const encoder = new TextEncoder();
      if (this.response) {
        writer.write(encoder.encode(this.response));
      }
      if (this.done) {
        writer.close();
      } else {
        const controller = {
          enqueue: async (chunk: string) => {
            await writer.write(encoder.encode(chunk));
          },
          close: () => writer.close(),
          error: (err: any) => writer.abort(err),
        };
        this.activeStreams.push(controller);
        request.signal.addEventListener("abort", () => {
          const index = this.activeStreams.indexOf(controller);
          if (index >= 0) {
            this.activeStreams.splice(index, 1);
          }
        });
      }
      return new Response(readable, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });
    } catch (error) {
      console.error("Stream fetch error:", error);
      return new Response("Unauthorized or error occurred", { status: 403 });
    }
  }
}

const app = new Hono<{ Bindings: Env }>();
app.use(cors());
app.get("/stream/:id", async (c) => {
  const binding = c.env.STREAM;
  const stub = binding.get(binding.idFromName(c.req.param("id")));
  const res = await stub.fetch(c.req.raw);
  return res;
});
app.put("/blob", async (c) => {
  const user = await verifyRequest(c.req.raw);
  const id = user.id + "/" + crypto.randomUUID();
  const contentType = c.req.header("content-type");
  if (!contentType) {
    return c.text("content-type header is required", 400);
  }
  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  if (!validTypes.includes(contentType)) {
    return c.text(`Unsupported file type: ${contentType}`, 400);
  }
  const contentLength = c.req.header("content-length");
  if (!contentLength || Number(contentLength) > 10 * 1024 * 1024) {
    return c.text("File size must be less than 10MB", 400);
  }
  await c.env.BLOB.put(id, await c.req.arrayBuffer());
  return c.json({ id }, 200);
});
app.all("*", async (c) => {
  try {
    const user = await verifyRequest(c.req.raw);
    const binding = c.env.USER;
    const stub = binding.get(binding.idFromName(user.id));
    return await stub.fetch(c.req.raw);
  } catch {
    c.text("", 403);
  }
});
export default app;
