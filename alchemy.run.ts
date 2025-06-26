import alchemy from "alchemy";
import {
  Worker,
  DurableObjectNamespace,
  R2Bucket,
  Nuxt,
  WranglerJson,
} from "alchemy/cloudflare";

const context = await alchemy("nuxflare-chat");

const zoneId = "4d534b83ec6eb19b914f40c66dc31510";
const domain =
  context.stage === "production"
    ? "chat.nuxflare.com"
    : `chat-${context.stage}.nuxflare.com`;

const blobsBucket = await R2Bucket("blobs");

const userDO = new DurableObjectNamespace("user-do", {
  className: "User",
  sqlite: true,
});
const streamDO = new DurableObjectNamespace("stream-do", {
  className: "Stream",
  sqlite: true,
});

const api = await Worker("api", {
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

await WranglerJson("api-wrangler", {
  worker: api,
  path: "packages/api/wrangler.json",
});

const nuxtHubSecret = alchemy.secret("random secret");
const app = await Nuxt("app", {
  main: "./packages/app/dist/server/index.mjs",
  command: `[ -z "$SKIP_BUILD" ] && cd packages/app && NITRO_PRESET=cloudflare-module bun run build || ( [ -n "$SKIP_BUILD" ] && echo "Skipping build." )`,
  assets: "./packages/app/dist/public",
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
    NUXT_HUB_PROJECT_SECRET_KEY: nuxtHubSecret.unencrypted,
    NUXT_PUBLIC_API_URL: `https://api.${domain}`,
    NUXT_PUBLIC_AUTH_URL: "https://auth.prodemo.nuxflare.com",
  },
});

await context.finalize();
