export default defineNuxtRouteMiddleware(async (to) => {
  if (
    to.path.startsWith("/api") ||
    to.path.startsWith("/login") ||
    to.path.startsWith("/clientId")
  )
    return;
  const { redirect, sessionState } = useAuth();
  const { data } = await useFetch("/api/auth/session", {
    key: "session",
  });
  if (data.value) {
    sessionState.value = { user: data.value };
    return;
  }
  sessionState.value = {};
  redirect.value = to.path;
  return navigateTo("/login");
});
