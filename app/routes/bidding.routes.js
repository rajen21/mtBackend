import { Router } from "express";
import { postBidding, getBidding } from "../controller/bidding.controller.js";
import { jwtTokenValidate } from "../middleware/auth.middleware.js";

export default (app) => {
  const router = Router();

  router.post("/bid", jwtTokenValidate, postBidding);
  router.get("/bid", jwtTokenValidate, getBidding);
  app.use("/", router);
};
