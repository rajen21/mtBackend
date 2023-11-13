import { Router } from "express";
import { PatchMarketData, getMarketData, getSpecificDateData } from "../controller/market.controller.js";

export default (app) => {
    const router = Router();
    router.post("/", PatchMarketData);
    router.get("/", getMarketData);
    router.get("/get-data/:date", getSpecificDateData);
    
    app.use("/market-data", router);
}