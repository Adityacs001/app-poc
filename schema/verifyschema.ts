import { string, object, TypeOf } from "yup";

export const verifySchema = object({
  email: string().required("Email is mandatory"),
  token: string().required("Token is mandatory"),
});

export type verifySchema = TypeOf<typeof verifySchema>;
