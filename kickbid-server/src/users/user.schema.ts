import { z } from "zod";
import { RegisterSchema } from "@src/auth/auth.schema";

export const UserSchema = RegisterSchema.extend({
  userId: z.string(),
})

export type UserType = z.infer<typeof UserSchema>;
