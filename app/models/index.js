import mongoose from "mongoose";
import dbConfig from "../config/db.config.js";
import user from "./user.model.js";
import marketData from "./market.model.js";
import statementModel from "./statement.model.js";

export default {
  mongoose,
  url: dbConfig.url,
  user: user(mongoose),
  marketData: marketData(mongoose),
  statement: statementModel(mongoose),
};
