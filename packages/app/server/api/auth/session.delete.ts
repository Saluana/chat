export default defineEventHandler(async (event) => {
  deleteCookie(event, "nuxflare-access-token");
  deleteCookie(event, "nuxflare-refresh-token");
});
