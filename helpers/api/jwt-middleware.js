const jwt = require("express-jwt");
const util = require("util");
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
  const { expressjwt } = jwt;
  console.log("jwt ", jwt);
  console.log("expressjwt ", expressjwt);
  const middleware = expressjwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      "/api/users/authenticate",
    ],
  });

  return util.promisify(middleware)(req, res);
}
