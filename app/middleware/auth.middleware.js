import jwt from "jsonwebtoken";

const get_cookies = function (request) {
  var cookies = {};
  request.headers &&
    request.headers.cookie.split(";").forEach(function (cookie) {
      const parts = cookie.match(/(.*?)=(.*)$/);
      cookies[parts[1].trim()] = (parts[2] || "").trim();
    });
  return cookies.refreshToken;
};

export const jwtTokenValidate = async (req, res, next) => {
  const authToken = req.headers?.authorization;
  const refreshToken = get_cookies(req);
  if (!authToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  try {
    const token = authToken.slice(7);
    const decode = jwt.verify(token, "mtSecret007");
    if (decode) {
      next();
    }
  } catch (Err) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }
    try {
      const decoded = jwt.verify(refreshToken, "mtSecret007");
      const accessToken = jwt.sign(decoded, "mtSecret007", { expiresIn: "1h" });
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken)
        .send(decoded);
    } catch (err) {
      return res
        .status(400)
        .send("Invalid Token.");
    }
  }
};
