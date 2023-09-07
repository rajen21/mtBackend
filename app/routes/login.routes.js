import { Router } from "express";
import {loginSchema} from "../validations/login.validation.js";
import {validLogin} from "../middleware/login.middleware.js";
import { loginUser, logoutUser } from "../controller/login.controller.js";

export default (app) => {
    const router = Router();
    router.post("/user-login", validLogin(loginSchema), loginUser);
    router.get("/user-logout", logoutUser);
    app.use("/", router);
}