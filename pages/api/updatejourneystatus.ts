import { NextApiRequestWithSession } from "../../lib/session";
import { enhancewithsession } from "../../lib/apimiddleware";
import { NextApiResponse } from "next";
import { Pushdetail } from "../../lib/fetcher";
import { UPDATEJOURNEYSTATUS } from "../../lib/apiendpointconstants";
import { useridentity } from "../../lib/commontypes";

const updatejourneystatus = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  const user = (await req.session.get("user")) as useridentity;
  if (req.method === "POST") {
    const {
      reqid,
      resumeid,
      reqresumeid,
      reasonid,
      comment,
      currentstatus,
      actiontype,
    } = req.body;
    let param: string = `${UPDATEJOURNEYSTATUS}`;
    const { status, message, data } = await Pushdetail(param, {
      reqid,
      resumeid,
      reqresumeid,
      clientid: user.clientid,
      contactid: user.contactid,
      reasonid,
      comment,
      currentstatus,
      actiontype,
    });
    if (status === 200) {
      return res.status(200).send({
        status: status,
        message: message,
        data: data,
      });
    } else {
      return res.status(501).send({
        status: status,
        message: message,
        data: data,
      });
    }
  } else
    return res.status(404).send({
      status: false,
      message: "unsupportedmethod",
      data: null,
    });
};

export default enhancewithsession(updatejourneystatus);
