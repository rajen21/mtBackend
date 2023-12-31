import { Router } from "express";
import { loginSchema } from "../validations/login.validation.js";
import { validLogin } from "../middleware/login.middleware.js";
import {
  loginUser,
  logoutUser,
  isUserExist,
  // refreshLoginToken,
} from "../controller/login.controller.js";
import { jwtTokenValidate } from "../middleware/auth.middleware.js";

export default (app) => {
  const router = Router();
  router.post("/user-login", validLogin(loginSchema), loginUser);
  // router.post("/auth-token-refresh", refreshLoginToken);
  router.post("/is-user-exists", isUserExist);
  router.get("/user-logout", jwtTokenValidate, logoutUser);
  app.use("/", router);
};
