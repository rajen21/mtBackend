import { Router } from "express";
import { getVersion, updateVersion } from "../controller/version.controller.js";

export default (app) => {
    const router = Router();
    router.patch("/:id", updateVersion);
    router.get("/:id", getVersion);
    
    app.use("/version", router);
}