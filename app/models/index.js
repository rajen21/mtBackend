import mongoose from "mongoose";
import dbConfig from "../config/db.config.js";
import user from "./user.model.js";

export default { mongoose, url: dbConfig.url, user: user(mongoose) };