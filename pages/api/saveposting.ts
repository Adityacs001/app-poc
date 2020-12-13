import { NextApiRequestWithSession } from "../../lib/session";
import { enhancewithsession } from "../../lib/apimiddleware";
import { NextApiResponse } from "next";
import { Pushdetail } from "../../lib/fetcher";
import { SAVEPOSTING } from "../../lib/apiendpointconstants";
import { useridentity } from "../../lib/commontypes";

const saveposting = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  const user = (await req.session.get("user")) as useridentity;
  if (req.method === "POST") {
    const {
      rid,
      positionprofile,
      jobcode,
      sector,
      department,
      divison,
      city,
      openings,
      targetdate,
      startdate,
      postingtype,
      worktype,
      workinghours,
      workingdays,
      additionalbenfits,
      specialneeds,
      ispublished,
      unpublishingreason,
      jobdescriptionfilename,
      jobdescriptionconverted,
    } = req.body;
    let param: string = `${SAVEPOSTING}`;

    const { status, message, data } = await Pushdetail(param, {
      rid,
      clientid: user.clientid,
      contactid: user.contactid,
      positionprofile,
      jobcode,
      sector,
      department,
      divison,
      city,
      openings,
      targetdate,
      startdate,
      postingtype,
      worktype,
      workinghours,
      workingdays,
      additionalbenfits,
      specialneeds,
      ispublished,
      unpublishingreason,
      jobdescriptionfilename,
      jobdescriptionconverted,
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

export default enhancewithsession(saveposting);
