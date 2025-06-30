import { object, string, type InferOutput } from "valibot";
import { createSubjects } from "@openauthjs/openauth/subject";

const baseUser = object({
  id: string(),
  email: string(),
  name: string(),
  image: string(),
});

export const subjects = createSubjects({
  user: baseUser,
});

export type SubjectUser = InferOutput<typeof subjects.user>;
