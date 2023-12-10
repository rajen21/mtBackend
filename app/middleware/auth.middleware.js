import jwt from "jsonwebtoken";

export const jwtTokenValidate = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    try {
      const token = authToken.slice(7);
      const decode = jwt.verify(token, "secret123");
      if (decode) {
        next();
      }
    } catch (err) {
      return res
        .status(401)
        .send("Access is denied due to invalid credentials.");
    }
  } else {
    return res.status(401).send("Please provide valid credentials");
  }
};
