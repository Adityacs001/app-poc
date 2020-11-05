import { withSessionhandler } from "./session";
import { NextApiRequestWithSession } from "./session";
import { NextApiResponse } from "next";

const authorizeapi = (enhancedhandler) => async (
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
      return enhancedhandler(req, res);
    }
  } catch {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};

export const enhancewithsession = (handler) =>
  withSessionhandler(authorizeapi(handler));
