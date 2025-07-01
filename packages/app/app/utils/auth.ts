import { createClient, type Client } from "@openauthjs/openauth/client";
import { type SubjectUser } from "@nuxflare-chat/common/auth";

type UserSession = {
  // sync time
  time?: number;
  user?: SubjectUser;
};

const useSessionState = () =>
  useState<UserSession>("nuxflare-session", () => ({}));

export const getAccessToken = () => useCookie("nuxflare-access-token").value;

export const useSession = () => {
  const sessionState = useSessionState();
  const clear = async () => {
    sessionState.value = {};
    await $fetch("/api/auth/session", { method: "DELETE" });
  };
  const refresh = async () => {
    const time = new Date().getTime();
    const user = await $fetch("/api/auth/session");
    if (user) {
      sessionState.value = { time, user };
      return;
    } else {
      sessionState.value = {};
    }
  };
  return {
    loggedIn: computed(() => !!sessionState.value.user),
    user: computed(() => sessionState.value.user || null),
    session: sessionState,
    clear,
    refresh,
  };
};

const useAuthRedirect = () =>
  useCookie("nuxflare-redirect", {
    sameSite: "lax",
  });

let _client: Client;
export const useAuth = () => {
  const client = _client
    ? _client
    : (_client = createClient({
        issuer: useRuntimeConfig().public.authUrl,
        clientID: useRuntimeConfig().public.authClientID,
      }));
  const callback = useRequestURL().origin + "/api/auth/callback";
  const redirect = useAuthRedirect();
  const sessionState = useSessionState();
  return {
    sessionState,
    client,
    callback,
    redirect,
  };
};
