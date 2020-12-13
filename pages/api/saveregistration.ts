import { NextApiRequestWithSession } from "../../lib/session";
import { enhancewithsession } from "../../lib/apimiddleware";
import { NextApiResponse } from "next";
import { Pushdetail } from "../../lib/fetcher";
import { SAVEREGISTRATION } from "../../lib/apiendpointconstants";

const saveregistration = async (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  if (req.method === "POST") {
    const {
      nameen,
      nameae,
      mothercompanyid,
      companysize,
      tradelicense,
      tadelicenseauthorityid,
      sectorid,
      industryid,
      cityid,
      website,
      about,
      fullname,
      emailaddress,
      mobilenumber,
      phonenumber,
      username,
      password,
      tradelicensefile,
      companylogo,
    } = req.body;
    let param: string = `${SAVEREGISTRATION}`;

    const { status, message, data } = await Pushdetail(param, {
      nameen,
      nameae,
      mothercompanyid,
      companysize,
      tradelicense,
      tadelicenseauthorityid,
      sectorid,
      industryid,
      cityid,
      website,
      about,
      fullname,
      emailaddress,
      mobilenumber,
      phonenumber,
      username,
      password,
      tradelicensefile,
      companylogo,
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

export default enhancewithsession(saveregistration);
