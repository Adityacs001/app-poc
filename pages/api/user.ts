import { withSessionhandler, redirector } from "../../lib/session";
import { enhancewithsession } from "../../lib/apimiddleware";
import { NextApiRequest, NextApiResponse } from "next";

const apiUser = withSessionhandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { session }: { session: Session } = req;
      //anoter way of typecasting is below
      const mysession = req.session as Session;
      const user = session.get("user");
      if (user) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed
        return res.json({
          isLoggedIn: true,
          ...user,
        });
      } else {
        return res.json({
          isLoggedIn: false,
        });
      }
    } catch {
      return res.json({
        isLoggedIn: false,
      });
    }
  },
);

export default enhancewithsession(apiUser);
