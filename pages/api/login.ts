import { withIronSession } from "next-iron-session";
import { Pushdetail } from "../../lib/fetcher";
import { LOGIN } from "../../lib/apiendpointconstants";
export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      const { username, password } = req.body;
      if (username != "" && password != "") {
        const { status, message, data } = await Pushdetail(LOGIN, {
          username,
          password,
        });
        if (status === 200) {
          req.session.set("user", data);
          await req.session.save();
          return res.status(201).send({
            status: true,
            message: message,
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
