import { Router } from "express";
import { getVersion, updateVersion } from "../controller/version.controller.js";
import { jwtTokenValidate } from "../middleware/auth.middleware.js";

export default (app) => {
    const router = Router();
    router.patch("/", jwtTokenValidate, updateVersion);
    router.get("/", jwtTokenValidate, getVersion);
    
    app.use("/version", router);
}