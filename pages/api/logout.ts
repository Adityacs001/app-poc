import { withIronSession } from "next-iron-session";

const handler = (req, res): void => {
  req.session.destroy();
  res.send("Logged out");
};

export default withIronSession(handler, {
  cookieName: process.env.APPLICATION_COOKIE_NAME,
  password: process.env.APPLICATION_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
