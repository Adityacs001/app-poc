import { withIronSession, Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
export type NextApiRequestWithSession = NextApiRequest & {
  session: Session;
};

const withSession = withIronSession(
  async ({ req, res }) => {
    const user = await req.session.get("user");

    if (!user) {
      res.statusCode = 301;
      res.setHeader("location", "SignIn");
      return { props: {} };
    }
    return {
      props: { user },
    };
  },
  {
    cookieName: process.env.APPLICATION_COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  },
);

export const withSessionhandler = (handler: any) =>
  withIronSession(handler, {
    cookieName: process.env.APPLICATION_COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  });

export const redirector = async ({ req, res }) => {
  const user = await req.session.get("user");
  if (!user) {
    res.statusCode = 301;
    res.setHeader("location", "login");
    return { props: {} };
  }
  return {
    props: { user },
  };
};

export const validationsession = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  try {
    const user = await req.session.get("user");
    res.setHeader("Content-Type", "application/json");
    if (!user) {
      return res.status(401).json({
        message: "unauthorized",
      });
    } else {
      return res.status(200).json({
        message: "success",
      });
    }
  } catch {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};

export default withSession;
