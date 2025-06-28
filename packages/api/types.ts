import * as v from "valibot";

export const NewThreadSchema = v.object({
  type: v.literal("new_thread"),
  data: v.object({
    id: v.string(),
    title: v.optional(v.string()),
    parent_thread_id: v.optional(v.string()),
  }),
});

export const UpdateThreadSchema = v.object({
  type: v.literal("update_thread"),
  data: v.object({
    id: v.string(),
    title: v.optional(v.string()),
    deleted: v.optional(v.boolean()),
    pinned: v.optional(v.boolean()),
  }),
});

const ModelOptionsSchema = v.object({
  name: v.string(),
  thinkingBudget: v.optional(v.picklist(["low", "medium", "high"])),
  webSearch: v.optional(v.boolean()),
});

const MessageDataSchema = v.object({
  content: v.string(),

  // for assistant messages, we store what model and options were used to generate the message.
  modelOptions: v.optional(ModelOptionsSchema),

  // for user messages, images/pdfs attached to the message
  attachments: v.optional(
    v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        type: v.picklist([
          "image/jpeg",
          "image/png",
          "image/webp",
          "application/pdf",
        ]),
      }),
    ),
  ),
});

export const NewMessageSchema = v.object({
  type: v.literal("new_message"),
  data: v.object({
    id: v.string(),
    data: MessageDataSchema,
    role: v.picklist(["user", "assistant", "system"]),
    threadId: v.string(),
  }),
});

export const UpdateMessageSchema = v.object({
  type: v.literal("update_message"),
  data: v.object({
    id: v.string(),
    data: v.optional(v.partial(MessageDataSchema)),
    deleted: v.optional(v.boolean()),
  }),
});

export const RunThreadSchema = v.object({
  type: v.literal("run_thread"),
  data: v.object({
    threadId: v.string(),
    messageId: v.optional(v.string()),
    options: v.optional(v.partial(ModelOptionsSchema)),
  }),
});

export const SetKVSchema = v.object({
  type: v.literal("set_kv"),
  data: v.object({
    name: v.string(),
    value: v.optional(v.string()),
  }),
});

export const StopThreadSchema = v.object({
  type: v.literal("stop_thread"),
  data: v.object({
    threadId: v.string(),
  }),
});

export const BranchThreadSchema = v.object({
  type: v.literal("branch_thread"),
  data: v.object({
    newThreadId: v.string(),
    threadId: v.string(),
    messageId: v.string(),
  }),
});

export const PushEventSchema = v.object({
  id: v.string(),
  events: v.array(
    v.union([
      NewThreadSchema,
      UpdateThreadSchema,
      NewMessageSchema,
      UpdateMessageSchema,
      RunThreadSchema,
      SetKVSchema,
      StopThreadSchema,
      BranchThreadSchema,
    ]),
  ),
});

export type PushEvent = v.InferOutput<typeof PushEventSchema>;

export type SyncEvent = {
  type: "thread" | "message" | "kv";
  clock: number;
  data: any;
};
