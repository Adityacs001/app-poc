import { NextApiRequestWithSession } from "../../lib/session";
import { enhancewithsession } from "../../lib/apimiddleware";
import { NextApiResponse } from "next";
import { Pushdetail } from "../../lib/fetcher";
import { ADDJOBSEEKERTOVACANCY } from "../../lib/apiendpointconstants";
import { useridentity } from "../../lib/commontypes";

const addjobseekertovacancy = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  const user = (await req.session.get("user")) as useridentity;

  if (req.method === "POST") {
    const { selectedvacancies, selectedjobseekers } = req.body;
    let param: string = `${ADDJOBSEEKERTOVACANCY}`;
    const { status, message, data } = await Pushdetail(param, {
      selectedvacancies,
      selectedjobseekers,
      clientid: user.clientid,
      contactid: user.contactid,
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

export default enhancewithsession(addjobseekertovacancy);
