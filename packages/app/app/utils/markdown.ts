import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import { unified } from "unified";

const chunkCache = new Map<string, string>();
const processingQueue = new Map<string, Promise<string>>();

export async function processMarkdownChunk(chunk: string): Promise<string> {
  const hash = await crypto.subtle
    .digest("SHA-1", new TextEncoder().encode(chunk))
    .then((buf) =>
      Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
    );

  if (chunkCache.has(hash)) {
    return chunkCache.get(hash)!;
  }

  if (processingQueue.has(hash)) {
    return processingQueue.get(hash)!;
  }

  const processing = markdownProcessor
    .process(chunk)
    .then((file) => file.toString());
  processingQueue.set(hash, processing);

  const result = await processing;
  chunkCache.set(hash, result);
  processingQueue.delete(hash);

  return result;
}

export const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeShiki, {
    themes: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
  })
  .use(rehypeKatex)
  .use(rehypeStringify);
