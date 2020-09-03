import withSession from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

import { Session } from "next-iron-session";

export default withSession(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { session }: { session: Session } = req;
    //anoter way of typecasting is below
    const mysession = req.session as Session;

    const user = session.get("user");

    if (user) {
      // in a real world application you might read the user id from the session and then do a database request
      // to get more information on the user if needed
      res.json({
        isLoggedIn: true,
        ...user,
      });
    } else {
      res.json({
        isLoggedIn: false,
      });
    }
  },
);
