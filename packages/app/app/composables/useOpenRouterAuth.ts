import { ref } from "vue";

function base64urlencode(str: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest("SHA-256", data);
}

export function useOpenRouterAuth() {
  const isLoggingIn = ref(false);

  const startLogin = async () => {
    isLoggingIn.value = true;
    const codeVerifier = Array.from(crypto.getRandomValues(new Uint8Array(64)))
      .map((b) => ("0" + b.toString(16)).slice(-2))
      .join("");
    const challengeBuffer = await sha256(codeVerifier);
    const codeChallenge = base64urlencode(challengeBuffer);

    // store verifier in session storage
    sessionStorage.setItem("openrouter_code_verifier", codeVerifier);
    // store a random state to protect against CSRF
    const state = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => ("0" + b.toString(16)).slice(-2))
      .join("");
    sessionStorage.setItem("openrouter_state", state);

    const rc = useRuntimeConfig();
    // client_id is optional per docs; when not provided we omit it
    const clientId = String(rc.public.openRouterClientId || "");
    // default callback to current origin + known path when not provided
    const callbackUrl =
      String(rc.public.openRouterRedirectUri || "") ||
      `${window.location.origin}/openrouter-callback`;

    const params = new URLSearchParams();
    params.append("response_type", "code");
    if (clientId) params.append("client_id", clientId);
    // OpenRouter expects a 'callback_url' parameter
    params.append("callback_url", callbackUrl);
    params.append("state", state);
    params.append("code_challenge", codeChallenge);
    params.append("code_challenge_method", "S256");
    params.append("scope", "all");

    const authUrl = String(
      rc.public.openRouterAuthUrl || "https://openrouter.ai/auth",
    );
    const url = `${authUrl}?${params.toString()}`;

    // Debug: log the final URL so devs can confirm params/authUrl are correct
    // This helps when runtime config is missing or incorrect.
    // eslint-disable-next-line no-console
    console.debug("OpenRouter PKCE redirect URL:", url);

    window.location.href = url;
  };

  const logoutOpenRouter = async () => {
    try {
      // Remove local copy immediately for UX
      if (typeof window !== "undefined") {
        localStorage.removeItem("openrouter_api_key");
      }
      // Best-effort: clear synced KV by setting empty
      try {
        const { $sync } = useNuxtApp();
        await $sync.setKV("openrouter_api_key", "");
      } catch {}
      // Notify UI listeners (Sidebar, etc.) to recompute state
      try {
        window.dispatchEvent(new CustomEvent("openrouter:connected"));
      } catch {}
    } catch (e) {
      console.error("OpenRouter logout failed", e);
    }
  };

  return { startLogin, logoutOpenRouter, isLoggingIn };
}
