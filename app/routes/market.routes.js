import { Router } from "express";
import { PatchMarketData } from "../controller/market.controller.js";

export default (app) => {
    const router = Router();
    router.patch("/:id", PatchMarketData);
    
    app.use("/market-data", router);
}