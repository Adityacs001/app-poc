import type { NextApiRequest, NextApiResponse } from "next";

type TokenModel = {
  isregistered: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenModel>
) {
  res.status(200).json({ isregistered: true });
}
