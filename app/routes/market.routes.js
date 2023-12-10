import { Router } from "express";
import { PatchMarketData, getMarketData, getSpecificDateData } from "../controller/market.controller.js";
import { jwtTokenValidate } from "../middleware/auth.middleware.js";

export default (app) => {
    const router = Router();
    router.post("/", jwtTokenValidate, PatchMarketData);
    router.get("/", jwtTokenValidate, getMarketData);
    router.post("/get-data", jwtTokenValidate, getSpecificDateData);
    
    app.use("/market-data", router);
}