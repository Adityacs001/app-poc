import { NextApiRequestWithSession } from "../../lib/session";
import { enhancewithsession } from "../../lib/apimiddleware";
import { NextApiResponse } from "next";
import { Pushdetail } from "../../lib/fetcher";
import { SAVEEXPAT } from "../../lib/apiendpointconstants";
import { useridentity } from "../../lib/commontypes";

const saveexpat = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  const user = (await req.session.get("user")) as useridentity;
  if (req.method === "POST") {
    const {
      rid,
      vacancy,
      expatcode,
      isnotinuae,
      emiratesid,
      englishname,
      arabicname,
      gender,
      dob,
      experience,
      passportnumber,
      unifiednumber,
      country,
      monthlysalary,
      iswithallowance,
      education,
      matchingcriteria,
      photofilename,
      photocontentconverted,
    } = req.body;
    let param: string = `${SAVEEXPAT}`;

    const { status, message, data } = await Pushdetail(param, {
      rid,
      clientid: user.clientid,
      contactid: user.contactid,
      vacancy,
      expatcode,
      isnotinuae,
      emiratesid,
      englishname,
      arabicname,
      gender,
      dob,
      experience,
      passportnumber,
      unifiednumber,
      country,
      monthlysalary,
      iswithallowance,
      education,
      matchingcriteria,
      photofilename,
      photocontentconverted,
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

export default enhancewithsession(saveexpat);
