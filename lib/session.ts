import { withIronSession } from "next-iron-session";

export default function withSession(handler: any) {
  return withIronSession(handler, {
    cookieName: process.env.APPLICATION_COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  });
}
