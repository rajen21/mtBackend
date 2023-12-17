import jwt from "jsonwebtoken";

export const jwtTokenValidate = async (req, res, next) => {
  const authToken = req.headers?.authorization;
  const refreshToken = req.cookies?.refreshToken;
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
      const decoded = jwt.verify(refreshToken, "mtRefreshSecret007");
      const accessToken = jwt.sign(decoded, "mtSecret007", { expiresIn: "1h" });
      return res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken)
        .send(decoded);
    } catch (err) {}
    return res.status(401).send("Access is denied due to invalid credentials.");
  }
};
