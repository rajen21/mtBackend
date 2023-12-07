import { Router } from "express";
import { getVersion, updateVersion } from "../controller/version.controller.js";

export default (app) => {
    const router = Router();
    router.patch("/", updateVersion);
    router.get("/", getVersion);
    
    app.use("/version", router);
}