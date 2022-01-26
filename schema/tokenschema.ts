import { string, object, TypeOf } from "yup";

export const tokenSchema = object({
  email: string().email().required(),
});

export type tokenSchema = TypeOf<typeof tokenSchema>;
