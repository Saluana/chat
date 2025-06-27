import alchemy from "alchemy";
import {
  Worker,
  DurableObjectNamespace,
  R2Bucket,
  Nuxt,
} from "alchemy/cloudflare";

const appName = "nuxflare-chat";
const context = await alchemy(appName);

const zoneId = "4d534b83ec6eb19b914f40c66dc31510";
const domain =
  context.stage === "production"
    ? "chat.nuxflare.com"
    : `chat-${context.stage}.nuxflare.com`;

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

const api = await Worker("api", {
  name: `${appName}-${context.stage}-api`,
  entrypoint: "./packages/api/index.ts",
  compatibilityFlags: ["nodejs_compat", "enable_request_signal"],
  rules: [
    {
      globs: ["**/*.js", "**/*.mjs", "**/*.wasm", "**/*.sql"],
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
  },
});

const app = await Nuxt("app", {
  name: `${appName}-${context.stage}-app`,
  main: "./packages/app/.output/server/index.mjs",
  command: `[ -z "$SKIP_BUILD" ] && cd packages/app && NITRO_PRESET=cloudflare-module bun run build || ( [ -n "$SKIP_BUILD" ] && echo "Skipping build." )`,
  assets: "./packages/app/.output/public",
  bindings: {
    BLOB: blobsBucket,
  },
  domains: [
    {
      domainName: domain,
      adopt: true,
      zoneId,
    },
  ],
  env: {
    NUXT_PUBLIC_API_URL: `https://api.${domain}`,
  },
});

await context.finalize();
