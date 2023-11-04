import { Router } from "express";
import { PatchMarketData } from "../controller/market.controller.js";

export default (app) => {
    const router = Router();
    router.patch("/", PatchMarketData);
    
    app.use("/market-data", router);
}