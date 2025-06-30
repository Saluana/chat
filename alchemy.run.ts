import alchemy from "alchemy";
import {
  Worker,
  DurableObjectNamespace,
  R2Bucket,
  Nuxt,
  KVNamespace,
} from "alchemy/cloudflare";

// config
const appName = "nuxflare-chat";
const context = await alchemy(appName);
const domain =
  context.stage === "production"
    ? "chat.nuxflare.com"
    : `chat-${context.stage}.nuxflare.com`;
const zoneId = "4d534b83ec6eb19b914f40c66dc31510";
const authClientID = "nuxflare-chat";

const blobsBucket = await R2Bucket("blobs", {
  name: `${appName}-${context.stage}-blobs`,
});

const userDO = new DurableObjectNamespace("user-do", {
  className: "User",
  sqlite: true,
});
const streamDO = new DurableObjectNamespace("stream-do", {
  className: "Stream",
  sqlite: true,
});

const authKV = await KVNamespace("auth-kv", {
  title: `${appName}-${context.stage}-auth-kv`,
});
const auth = await Worker("auth", {
  name: `${appName}-${context.stage}-auth`,
  entrypoint: "./packages/auth/index.ts",
  compatibilityFlags: ["nodejs_compat"],
  domains: [
    {
      domainName: `auth.${domain}`,
      adopt: true,
      zoneId,
    },
  ],
  bindings: {
    KV: authKV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  },
});

const api = await Worker("api", {
  name: `${appName}-${context.stage}-api`,
  entrypoint: "./packages/api/index.ts",
  compatibilityFlags: ["nodejs_compat", "enable_request_signal"],
  bundle: {
    loader: {
      ".md": "text",
    },
  },
  rules: [
    {
      globs: ["**/*.js", "**/*.mjs", "**/*.wasm", "**/*.sql"],
    },
    {
      globs: ["**/*.md"],
    },
  ],
  domains: [
    {
      domainName: `api.${domain}`,
      adopt: true,
      zoneId,
    },
  ],
  bindings: {
    BLOB: blobsBucket,
    USER: userDO,
    STREAM: streamDO,
    AUTH_URL: `auth.${domain}`,
    AUTH_CLIENT_ID: authClientID,
  },
});

const app = await Nuxt("app", {
  name: `${appName}-${context.stage}-app`,
  main: "./packages/app/.output/server/index.mjs",
  command: `[ -z "$SKIP_BUILD" ] && cd packages/app && NITRO_PRESET=cloudflare-module bun run build || ( [ -n "$SKIP_BUILD" ] && echo "Skipping build." )`,
  assets: "./packages/app/.output/public",
  domains: [
    {
      domainName: domain,
      adopt: true,
      zoneId,
    },
  ],
  env: {
    NUXT_PUBLIC_API_URL: `https://api.${domain}`,
    NUXT_PUBLIC_AUTH_URL: `https://auth.${domain}`,
    NUXT_PUBLIC_AUTH_CLIENT_ID: authClientID,
  },
});

await context.finalize();
