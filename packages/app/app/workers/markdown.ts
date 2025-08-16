// Markdown Web Worker: fast base pipeline first, defer Shiki until needed.
// Protocol:
//  - { type: 'warmup', mode?: 'base'|'heavy' }
//  - { type: 'render', id: string, text: string }
//  - posts { type: 'base_ready' } when base pipeline is ready
//  - posts { type: 'heavy_ready' } when Shiki is loaded
//  - posts { type: 'result', id, html } or { type: 'error', id, error }

type Proc = { process: (input: string) => Promise<any> };

let baseNoMathInit: Promise<Proc> | null = null;
let baseWithMathInit: Promise<Proc> | null = null;
let enhancedInit: Promise<Proc> | null = null;
let shikiLoaded = false;

async function initBaseNoMath(): Promise<Proc> {
  if (!baseNoMathInit) {
    baseNoMathInit = (async () => {
      const [
        { unified },
        remarkParse,
        remarkGfm,
        remarkRehype,
        rehypeStringify,
      ] = await Promise.all([
        import("unified"),
        import("remark-parse"),
        import("remark-gfm"),
        import("remark-rehype"),
        import("rehype-stringify"),
      ]);

      const proc = (unified as any)()
        .use((remarkParse as any).default || (remarkParse as any))
        .use((remarkGfm as any).default || (remarkGfm as any))
        .use((remarkRehype as any).default || (remarkRehype as any))
        .use((rehypeStringify as any).default || (rehypeStringify as any));

      (self as any).postMessage({ type: "base_ready" });
      return proc as Proc;
    })();
  }
  return baseNoMathInit;
}

async function initBaseWithMath(): Promise<Proc> {
  if (!baseWithMathInit) {
    baseWithMathInit = (async () => {
      const [
        { unified },
        remarkParse,
        remarkGfm,
        remarkMath,
        remarkRehype,
        rehypeKatex,
        rehypeStringify,
      ] = await Promise.all([
        import("unified"),
        import("remark-parse"),
        import("remark-gfm"),
        import("remark-math"),
        import("remark-rehype"),
        import("rehype-katex"),
        import("rehype-stringify"),
      ]);

      const proc = (unified as any)()
        .use((remarkParse as any).default || (remarkParse as any))
        .use((remarkGfm as any).default || (remarkGfm as any))
        .use((remarkMath as any).default || (remarkMath as any))
        .use((remarkRehype as any).default || (remarkRehype as any))
        .use((rehypeKatex as any).default || (rehypeKatex as any))
        .use((rehypeStringify as any).default || (rehypeStringify as any));

      return proc as Proc;
    })();
  }
  return baseWithMathInit;
}

async function initEnhanced(): Promise<Proc> {
  if (!enhancedInit) {
    enhancedInit = (async () => {
      const [
        { unified },
        remarkParse,
        remarkGfm,
        remarkMath,
        remarkRehype,
        rehypeKatex,
        rehypeStringify,
        rehypeShiki,
      ] = await Promise.all([
        import("unified"),
        import("remark-parse"),
        import("remark-gfm"),
        import("remark-math"),
        import("remark-rehype"),
        import("rehype-katex"),
        import("rehype-stringify"),
        import("@shikijs/rehype"),
      ]);

      const proc = (unified as any)()
        .use((remarkParse as any).default || (remarkParse as any))
        .use((remarkGfm as any).default || (remarkGfm as any))
        .use((remarkMath as any).default || (remarkMath as any))
        .use((remarkRehype as any).default || (remarkRehype as any))
        .use((rehypeShiki as any).default || (rehypeShiki as any), {
          defaultLanguage: "txt",
          fallbackLanguage: "txt",
          themes: { light: "vitesse-light", dark: "vitesse-dark" },
        })
        .use((rehypeKatex as any).default || (rehypeKatex as any))
        .use((rehypeStringify as any).default || (rehypeStringify as any));

      shikiLoaded = true;
      (self as any).postMessage({ type: "heavy_ready" });
      return proc as Proc;
    })();
  }
  return enhancedInit;
}

function hasCodeFences(text: string): boolean {
  return /```|~~~/.test(text);
}
function hasMath(text: string): boolean {
  return /(\$\$[\s\S]*?\$\$)|(\$[^\n$]+\$)|(\\\(|\\\)|\\\[|\\\])/.test(text);
}

addEventListener("message", async (evt: MessageEvent) => {
  const data = evt.data;
  if (!data || typeof data !== "object") return;
  if (data.type === "warmup") {
    try {
      await initBaseNoMath();
      if (data.mode === "heavy") {
        await initEnhanced();
      }
    } catch {}
    return;
  }
  if (data.type === "render") {
    const { id, text } = data as { id: string; text: string };
    try {
      let html: string;
      if (hasCodeFences(text) && !shikiLoaded) {
        // Fast path without Shiki
        const base = hasMath(text)
          ? await initBaseWithMath()
          : await initBaseNoMath();
        html = String(await base.process(text || ""));
      } else if (hasCodeFences(text)) {
        const enhanced = await initEnhanced();
        html = String(await enhanced.process(text || ""));
      } else {
        const base = hasMath(text)
          ? await initBaseWithMath()
          : await initBaseNoMath();
        html = String(await base.process(text || ""));
      }
      (self as any).postMessage({ type: "result", id, html });
    } catch (e: any) {
      (self as any).postMessage({
        type: "error",
        id,
        error: String(e?.message || e),
      });
    }
  }
});
