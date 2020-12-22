import { withIronSession } from "next-iron-session";
import { Pushdetail } from "../../lib/fetcher";
import { FORGOTPASSWORD } from "../../lib/apiendpointconstants";
export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      const { emailaddress } = req.body;
      if (emailaddress != "") {
        const { status, message, data } = await Pushdetail(FORGOTPASSWORD, {
          emailaddress,
        });
        if (status === 200) {
          return res.status(200).send({
            status: status,
            message: message,
            data: data,
          });
        } else {
          return res.status(403).send({
            status: false,
            message: message,
            data: null,
          });
        }
      }
      return res.status(403).send({
        status: false,
        message: "invalidcredentials",
        data: null,
      });
    }

    return res.status(404).send({
      status: false,
      message: "unsupportedmethod",
      data: null,
    });
  },
  {
    cookieName: process.env.APPLICATION_COOKIE_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  },
);
