import { authUrl, authClientID, subjects } from "@nuxflare-chat/common/auth";
import { type Client, createClient } from "@openauthjs/openauth/client";
import type { H3Event } from "h3";

let _client: Client;
export const getClient = (_event: H3Event) => {
  if (_client) return _client;
  return (_client = createClient({
    issuer: authUrl,
    clientID: authClientID,
  }));
};

export const setTokens = (event: H3Event, access: string, refresh: string) => {
  setCookie(event, "nuxflare-access-token", access, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    // access token is also used by websockets
    // in the browser so can't be httpOnly
    httpOnly: false,
  });
  setCookie(event, "nuxflare-refresh-token", refresh, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
  });
};

export const getTokens = (event: H3Event) => {
  const access = getCookie(event, "nuxflare-access-token") || "";
  const refresh = getCookie(event, "nuxflare-refresh-token") || "";
  return { access, refresh };
};

export async function getUserSession(
  event: H3Event,
  accessToken = "",
  refreshToken = "",
) {
  const { access, refresh } = getTokens(event);
  const client = getClient(event);
  const verified = await client.verify(subjects, access || accessToken, {
    refresh: refresh || refreshToken,
  });
  if (!verified.err) {
    if (verified.tokens) {
      const { access, refresh } = verified.tokens;
      setTokens(event, access, refresh);
    }
    return verified.subject.properties;
  }
}
