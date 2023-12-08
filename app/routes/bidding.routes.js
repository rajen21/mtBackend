import { Router } from "express";
import { postBidding, getBidding } from "../controller/bidding.controller.js";

export default (app) => {
  const router = Router();

  router.post("/bid", postBidding);
  router.get("/bid", getBidding);
  app.use("/", router);
};
