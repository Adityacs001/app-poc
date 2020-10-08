import { withIronSession } from "next-iron-session";

// export default function withSession(handler: any) {
//   return withIronSession(handler, {
//     cookieName: process.env.APPLICATION_COOKIE_NAME,
//     cookieOptions: {
//       secure: process.env.NODE_ENV === "production" ? true : false,
//     },
//     password: process.env.APPLICATION_SECRET,
//   });
// }

const withSession = withIronSession(
  async ({ req, res }) => {
    const user = await req.session.get("user");
    if (!user) {
      res.statusCode = 401;
      res.writeHead(302, { Location: "/SignInPage" });
      res.end();
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

export default withSession;
