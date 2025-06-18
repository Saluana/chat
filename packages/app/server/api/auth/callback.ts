export default defineEventHandler(async (event) => {
  try {
    const callback = getRequestURL(event).origin + "/api/auth/callback";
    const code = getQuery(event).code?.toString() || "";
    const client = getClient(event);
    const tokens = await client.exchange(code, callback);
    if (!tokens.err) {
      const { access, refresh } = tokens.tokens;
      setTokens(event, access, refresh);
      const redirect = getCookie(event, "nuxflare-redirect");
      if (redirect) {
        deleteCookie(event, "nuxflare-redirect");
      }
      return sendRedirect(event, redirect || "/");
    }
  } catch {
    // throws error below
  }
  throw createError({ status: 401, message: "Couldn't login." });
});
