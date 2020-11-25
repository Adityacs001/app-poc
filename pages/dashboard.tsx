import * as React from "react";
import { useRouter } from "next/router";
import withSession from "lib/session";

const DashboardPage = (props) => {
  const { user } = props;

  const router = useRouter();
  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      return router.push("/SignInPage");
    }
  };

  return (
    <div>
      <h1>Hello {user?.email}</h1>
      <p>Secret things live here...</p>
      <button onClick={(e) => handleLogout(e)}>Logout</button>
    </div>
  );
};

// export const getServerSideProps = withIronSession(
//   async ({ req, res }) => {
//     const user = await req.session.get("user");
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
//     cookieName: process.env.APPLICATION_COOKIE_NAME,
//     cookieOptions: {
//       secure: process.env.NODE_ENV === "production" ? true : false,
//     },
//     password: process.env.APPLICATION_SECRET,
//   },
// );

export const getServerSideProps = withSession;

export default DashboardPage;
