<template>
  <div class="p-6">
    <p>Completing login...</p>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const rc = useRuntimeConfig();

onMounted(async () => {
  const code = route.query.code;
  const state = route.query.state;
  const verifier = sessionStorage.getItem("openrouter_code_verifier");
  const savedState = sessionStorage.getItem("openrouter_state");
  if (!code || !verifier) {
    console.error("Missing code or verifier");
    return router.push("/");
  }
  if (savedState && state !== savedState) {
    console.error("State mismatch, potential CSRF");
    return router.push("/");
  }

  try {
    // Call OpenRouter directly per docs: https://openrouter.ai/api/v1/auth/keys
    const directResp = await fetch("https://openrouter.ai/api/v1/auth/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: String(code),
        code_verifier: verifier,
        code_challenge_method: "S256",
      }),
    });
    const directJson = await directResp.json().catch(() => null);
    if (!directResp.ok || !directJson) {
      console.error("Direct exchange failed", directResp.status, directJson);
      return;
    }
    const userKey = directJson.key || directJson.access_token;
    if (!userKey) {
      console.error("Direct exchange returned no key", directJson);
      return;
    }
    // store in localStorage for use by front-end
    localStorage.setItem("openrouter_api_key", userKey);
    try {
      window.dispatchEvent(new CustomEvent("openrouter:connected"));
      // Best-effort: also persist to synced KV
      try {
        const { $sync } = useNuxtApp();
        await $sync.setKV("openrouter_api_key", userKey);
      } catch {}
    } catch {}
    sessionStorage.removeItem("openrouter_code_verifier");
    sessionStorage.removeItem("openrouter_state");
    router.push("/");
  } catch (err) {
    console.error("Exchange failed", err);
    return;
  }
});
</script>
