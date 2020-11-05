import { NextApiRequestWithSession } from "../../lib/session";
import { enhancewithsession } from "../../lib/apimiddleware";
import { NextApiResponse } from "next";

const apiPing = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  const user = await req.session.get("user");
  return res.status(200).json({
    message: user,
  });
};

export default enhancewithsession(apiPing);
