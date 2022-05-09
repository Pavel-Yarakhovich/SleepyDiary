const jwt = require("jsonwebtoken");
import getConfig from "next/config";

import { apiHandler } from "helpers/api";
import dbConnect from "lib/dbConnect";
import User from "models/user";

const { serverRuntimeConfig } = getConfig();

export default apiHandler(handler);

function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      return authenticate();
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }

  async function authenticate() {
    const { username, email } = req.body;

    await dbConnect();

    const user = await User.findOne({ name: username, email });

    if (!user) throw "Username or email is incorrect";

    // create a jwt token
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, {
      expiresIn: "2d",
    });

    // return basic user details and token
    return res.status(200).json({
      id: user._id,
      username: user.name,
      firstName: user.name,
      email: user.email,
      token,
    });
  }
}
