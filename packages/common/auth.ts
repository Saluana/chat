import { object, string, type InferOutput } from "valibot";
import { createSubjects } from "@openauthjs/openauth/subject";

const baseUser = object({
  id: string(),
  email: string(),
  name: string(),
  image: string(),
});

// use any OpenAuth issuer that supports Google auth
export const authUrl = "https://auth.prodemo.nuxflare.com";
export const authClientID = "nuxflare-chat";

export const subjects = createSubjects({
  user: baseUser,
});

export type SubjectUser = InferOutput<typeof subjects.user>;
