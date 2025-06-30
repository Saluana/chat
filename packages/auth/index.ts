import { issuer } from "@openauthjs/openauth";
import { CloudflareStorage } from "@openauthjs/openauth/storage/cloudflare";
import { GoogleProvider } from "@openauthjs/openauth/provider/google";
import { ofetch } from "ofetch";
import { subjects } from "@nuxflare-chat/common/auth";
import type { ExecutionContext, KVNamespace } from "@cloudflare/workers-types";

interface Env {
  KV: KVNamespace;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const hono = issuer({
      storage: CloudflareStorage({
        namespace: env.KV,
      }),
      subjects,
      providers: {
        google: GoogleProvider({
          clientID: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
          scopes: ["openid", "email", "profile"],
        }),
      },
      success: async (ctx, value) => {
        async function getUserObject(): Promise<{
          email: string;
          name: string;
          image: string;
        }> {
          if (value.provider === "google") {
            const accessToken = value.tokenset.access;
            const data = await ofetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              },
            );
            return {
              email: data.email as string,
              name: data.name as string,
              image: data.picture as string,
            };
          }
          // for github
          const accessToken = value.tokenset.access;
          const data = await ofetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "User-Agent": "nuxflare-auth",
            },
          });
          if (!data.email) {
            const emails = (await ofetch("https://api.github.com/user/emails", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "User-Agent": "nuxflare-auth",
              },
            })) as any[];
            data.email = (
              emails.find((email) => email.primary) || emails[0]
            )?.email;
          }
          return {
            email: data.email as string,
            name: data.name as string,
            image: data.avatar_url as string,
          };
        }

        try {
          const user = await getUserObject();
          return ctx.subject("user", {
            id: Buffer.from(user.email).toString("base64"),
            name: user.name,
            email: user.email,
            image: user.image,
          });
        } catch (err) {
          console.error("err in success", err);
          throw new Error("Something went wrong");
        }
      },
    });
    return hono.fetch(request, env, ctx);
  },
};
