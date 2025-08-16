# Nuxflare Chat

> Nuxflare Chat was originally started as a project for the T3 Chat Cloneathon (https://cloneathon.t3.chat).

Nuxflare Chat is a blazing-fast, open-source AI chat app built with Cloudflare and Nuxt.

## ✨ What Makes It Special

### 🏎️ **Lightning Fast & Local-First**

- Store everything in your browser with wa-sqlite + OPFS
- Switch between threads instantly—no network waiting
- Full-text search through all your chats locally with SQLite FTS5
- Smart tab coordination: one WebSocket connection and database connection shared across all tabs

### 🔄 **Real-Time Everything**

- Custom sync engine with logical clocks
- Durable, resumable streams that survive network hiccups
- Live updates across all your tabs and devices
- Built on Cloudflare Durable Objects for global edge performance

### 🎨 **Beautiful & Thoughtful Design**

- Gorgeous light/dark modes with glassmorphic effects
- Optimized chunked markdown rendering
- Code syntax highlighting + LaTeX support with KaTeX
- Smooth animations that don't get in your way

### 🧠 **AI Superpowers**

- Any OpenRouter model + provider-specific keys
- Thinking models with reasoning streams
- Edit/delete messages, branch conversations, retry generations
- Image and PDF attachments support
- Web search grounding

### 🛠️ **Developer Experience**

- Deploy to your Cloudflare account in one command with [Alchemy](https://alchemy.run)
- Works with any OpenAuth.js endpoint
- Clean subdomain architecture (auth, api, app)
- Zero-config development setup

## 🚀 Quick Start

### Prerequisites

- Cloudflare account with R2 enabled
- Domain pointed to Cloudflare nameservers
- Google OAuth credentials

### Deploy to Production

1. **Clone and configure**

   ```bash
   git clone https://github.com/nuxflare/chat
   cd nuxflare-chat
   cp .env.example .env
   ```

2. **Set up environment**
   Edit `.env` with your Google OAuth credentials:

   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_secret
   ```

3. **Configure domain**
   Edit `alchemy.run.ts` with your domain and Cloudflare zone ID.

4. **Deploy everything**
   ```bash
   bun install
   bun run alchemy.run.ts --stage production
   ```

That's it! Your chat app is live at `https://your-domain.com` 🎉

### Local Development

```bash
bun install

# Terminal 1: Frontend
cd packages/app && bun run dev

# Terminal 2: API
cd packages/api && bunx wrangler dev
```

**Auth Setup for Development**

By default, development mode uses `auth.chat.nuxflare.com` as the auth endpoint—you can keep using this for quick development.

To use your own auth endpoint:

- Deploy once with the production steps above
- Update the auth URL in `packages/api/.dev.vars` to point to your deployment

Alternatively, run the auth server locally:

```bash
# Terminal 3: Auth (optional)
cd packages/auth && bunx wrangler dev
```

## 🏗️ Architecture

**Edge-First Design**

- **Frontend**: Nuxt 3 + Nuxt UI + Tailwind v4
- **Backend**: Cloudflare Workers + Durable Objects + R2
- **AI**: OpenRouter + Vercel AI SDK
- **Auth**: OpenAuth.js compatible

**Smart Client Coordination**

Multiple tabs? No problem. We use web locks + service workers to ensure only one tab handles the WebSocket connection and database, then broadcasts updates to others. Saves bandwidth and prevents conflicts.

**Durable Objects Magic**

- `User DO`: Your personal data store, located close to you
- `Stream DO`: Handles resumable AI response streams

## 🛣️ What's Next

We're just getting started. Coming soon:

- 🔌 MCP servers integration
- 👥 Teams and multi-user chats
- 🤖 More agentic workflows
- 🎛️ Custom model/provider management
- ✨ Smoother animations and UX

_Basically, if you see a cool feature in any chat app, let us know and we WILL start working on it._

## 🤝 Contributing

Found a bug? Have an idea? PRs and issues welcome! This started as a hackathon project but has grown into something the community can build on together.

## 📄 License

MIT - Go wild, build cool stuff.

---

_Made with ☕_

## Performance marks (boot instrumentation)

We instrument client boot to track time-to-interactive milestones:

- app_start: when the client plugin initializes
- shell_painted: shortly after first paint/next frame
- first_click_ready: first user interaction after the shell is ready
- heavy_deps_loaded: when markdown/db heavy modules finish loading (you can mark this from code)

How to use:

- Open DevTools → Console. On dev builds the app logs a compact table of marks and warns if budgets are exceeded.
- From code, trigger the heavy mark after your heavy modules are initialized:

```ts
// anywhere in the Nuxt app after heavy subsystems are ready
const { $perf } = useNuxtApp();
$perf?.markHeavyDepsLoaded();

// or dispatch a DOM event (alternative)
window.dispatchEvent(new Event("perf:heavy_deps_loaded"));
```

Budgets (dev):

- shell_painted ≤ 1500ms from app_start
- heavy_deps_loaded ≤ 3000ms from app_start
