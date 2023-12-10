import { Router } from "express";
import {
  addStatement,
  getAssociatedStatements,
} from "../controller/statement.controller.js";
import { jwtTokenValidate } from "../middleware/auth.middleware.js";

export default (app) => {
  const router = Router();
  router.post("/add-statement", jwtTokenValidate, addStatement);
  router.get("/get-statements/:userId", jwtTokenValidate, getAssociatedStatements);
  app.use("/statement", router);
};
