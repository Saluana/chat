// Safe UUID v4 generator for environments where crypto.randomUUID may be unavailable
export function uuidv4(): string {
  const g: any = globalThis as any;
  const cryptoObj = g?.crypto;
  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }
  const getRandomValues: ((arr: Uint8Array) => Uint8Array) | undefined =
    cryptoObj?.getRandomValues;
  const bytes = new Uint8Array(16);
  if (getRandomValues) getRandomValues.call(cryptoObj, bytes);
  else for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  // Set version/variant bits
  bytes[6] = ((bytes[6] as number) & 0x0f) | 0x40;
  bytes[8] = ((bytes[8] as number) & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
    "",
  );
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
