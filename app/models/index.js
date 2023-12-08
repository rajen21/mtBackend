import mongoose from "mongoose";
import dbConfig from "../config/db.config.js";
import user from "./user.model.js";
import marketData from "./market.model.js";
import statementModel from "./statement.model.js";
import versionModel from "./version.model.js";
import biddingModel from "./bidding.model.js";

export default {
  mongoose,
  url: dbConfig.url,
  user: user(mongoose),
  marketData: marketData(mongoose),
  statement: statementModel(mongoose),
  version: versionModel(mongoose),
  bidding: biddingModel(mongoose),
};
