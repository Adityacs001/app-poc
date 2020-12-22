import { NextApiRequestWithSession } from "../../lib/session";
import { enhancewithsession } from "../../lib/apimiddleware";
import { NextApiResponse } from "next";
import { Pushdetail } from "../../lib/fetcher";
import { SAVEINTERVIEWSCHEDULAR } from "../../lib/apiendpointconstants";
import { useridentity } from "../../lib/commontypes";

const saveinterviewschedular = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  const user = (await req.session.get("user")) as useridentity;
  if (req.method === "POST") {
    const {
      rid,
      resumeid,
      reqid,
      reqresumeid,
      interviewdate,
      interviewduration,
      interviewpanel,
      interviewmode,
      interviewlocation,
      comment,
    } = req.body;
    let param: string = `${SAVEINTERVIEWSCHEDULAR}`;

    const { status, message, data } = await Pushdetail(param, {
      rid,
      clientid: user.clientid,
      contactid: user.contactid,
      resumeid,
      reqid,
      reqresumeid,
      interviewdate,
      interviewduration,
      interviewpanel,
      interviewmode,
      interviewlocation,
      comment,
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

export default enhancewithsession(saveinterviewschedular);
