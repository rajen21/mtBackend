import { Router } from "express";
import {
  addStatement,
  getAssociatedStatements,
} from "../controller/statement.controller.js";

export default (app) => {
  const router = Router();
  router.post("/add-statement", addStatement);
  router.get("/get-statements/:userId", getAssociatedStatements);
  app.use("/statement", router);
};
