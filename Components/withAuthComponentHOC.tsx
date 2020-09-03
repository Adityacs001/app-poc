import { withIronSession } from "next-iron-session";
const withAuthComponentHOC = (Component: any) =>
  (props) => {
    return <Component {...props} />;
  };

// export const getServerSideProps = withIronSession(
//   async ({ req, res }) => {
//     const user = req.session.get("user");

//     if (!user) {
//       res.statusCode = 401;
//       res.writeHead(302, { Location: "/SignInPage" });
//       res.end();

//       return { props: {} };
//     }

//     return {
//       props: { user },
//     };
//   },
//   {
//     cookieName: "MYSITECOOKIE",
//     cookieOptions: {
//       secure: process.env.NODE_ENV === "production" ? true : false,
//     },
//     password: process.env.NEXT_APP_APPLICATION_SECRET,
//   },
// );

export const ensureAuth = (ctx) =>
  withIronSession(async (ctx) => {
    const { req, res } = ctx;
    const user = req.session.get("user");
    if (!user) {
      res.statusCode = 401;
      res.writeHead(302, { Location: "/SignInPage" });
      res.end();
      return { props: {} };
    }
    return {
      props: { user },
    };
  }, {
    cookieName: "MYSITECOOKIE",
    password: process.env.APPLICATION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

export default withAuthComponentHOC;
