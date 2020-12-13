import { NextApiRequestWithSession } from "../../lib/session";
import { enhancewithsession } from "../../lib/apimiddleware";
import { NextApiResponse } from "next";
import { fetchdetail } from "../../lib/fetcher";
import { GETALLMATCHINGFORVACANCY } from "../../lib/apiendpointconstants";
import { useridentity } from "../../lib/commontypes";

const getallmatchingforvacancy = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  const user = (await req.session.get("user")) as useridentity;
  if (req.method === "GET") {
    const { rid, stageid } = req.query;

    let param: string = `${GETALLMATCHINGFORVACANCY}?rid=${rid}&stageid=${stageid}&clientid=${user.clientid}&contactid=${user.contactid}`;

    const { status, message, data } = await fetchdetail(param);
    if (status === 200) {
      return res.status(200).send({
        status: status,
        message: message,
        data: data,
      });
    } else {
      return res.status(400).send({
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

export default enhancewithsession(getallmatchingforvacancy);
