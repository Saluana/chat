import { createClient, type Client } from "@openauthjs/openauth/client";
import {
  authClientID,
  authUrl,
  type SubjectUser,
} from "@nuxflare-chat/common/auth";

type UserSession = {
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
    const { data } = await useFetch("/api/auth/session");
    if (data.value) {
      sessionState.value = { user: data.value };
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
        issuer: authUrl,
        clientID: authClientID,
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
