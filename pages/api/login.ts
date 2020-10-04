import { withIronSession } from "next-iron-session";

const VALID_EMAIL = "aditya.singh@hra.gov.ae";
const VALID_PASSWORD = "123";

export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      const { email, password } = req.body;
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        req.session.set("user", { email });
        await req.session.save();
        return res.status(201).send({
          status: true,
          msg: "loggedin",
          data: { email },
        });
      }
      return res.status(403).send({
        status: false,
        msg: "invalidcredentials",
        data: null,
      });
    }

    return res.status(404).send({
      status: false,
      msg: "unsupportedmethod",
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
