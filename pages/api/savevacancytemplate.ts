import { NextApiRequestWithSession } from "../../lib/session";
import { enhancewithsession } from "../../lib/apimiddleware";
import { NextApiResponse } from "next";
import { Pushdetail } from "../../lib/fetcher";
import { SAVEVACANCYTEMPLATE } from "../../lib/apiendpointconstants";
import { useridentity } from "../../lib/commontypes";

const savevacancytemplate = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  const user = (await req.session.get("user")) as useridentity;
  if (req.method === "POST") {
    const {
      rid,
      jobtitleen,
      jobtitleae,
      criticality,
      grade,
      jobcategory,
      jobrole,
      experience,
      salaryrange,
      gender,
      employementype,
      careerlevel,
      isnationalonly,
      isactive,
      requirededucation,
      requiredskill,
      requiredabilities,
      responsbilities,
      description,
    } = req.body;
    let param: string = `${SAVEVACANCYTEMPLATE}`;
    const { status, message, data } = await Pushdetail(param, {
      rid,
      clientid: user.clientid,
      contactid: user.contactid,
      jobtitleen,
      jobtitleae,
      criticality,
      grade,
      jobcategory,
      jobrole,
      experience,
      salaryrange,
      gender,
      employementype,
      careerlevel,
      isnationalonly,
      isactive,
      requirededucation,
      requiredskill,
      requiredabilities,
      responsbilities,
      description,
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

export default enhancewithsession(savevacancytemplate);
