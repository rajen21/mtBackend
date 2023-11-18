import { Router } from "express";
import { createUserSchema } from "../validations/user.validation.js";
import { validUser } from "../middleware/user.middleware.js";
import {
  createUser,
  deleteUser,
  findOneUser,
  updateUser,
  getAgentAssociatedUsers,
  addBalance,
  removeBalance,
} from "../controller/user.controller.js";

export default (app) => {
  const router = Router();
  router.get("/associated-users/:agentId", getAgentAssociatedUsers);
  router.get("/:id", findOneUser);
  router.post("/", validUser(createUserSchema), createUser);
  router.patch("/add-balance/:id", addBalance);
  router.patch("/remove-balance/:id", removeBalance);
  router.patch("/:id", updateUser);
  router.delete("/:id", deleteUser);
  app.use("/user", router);
};
