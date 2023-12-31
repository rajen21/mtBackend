import { Router } from "express";
import {
  PatchMarketData,
  getMarketData,
  getSpecificDateData,
  getMarketTime,
} from "../controller/market.controller.js";
import { jwtTokenValidate } from "../middleware/auth.middleware.js";

export default (app) => {
  const router = Router();
  router.post("/", jwtTokenValidate, PatchMarketData);
  router.get("/", jwtTokenValidate, getMarketData);
  router.post("/get-data", jwtTokenValidate, getSpecificDateData);
  router.get("/market-time", jwtTokenValidate, getMarketTime);

  app.use("/market-data", router);
};
