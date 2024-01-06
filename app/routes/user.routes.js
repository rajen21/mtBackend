import { Router } from "express";
import { createUserSchema } from "../validations/user.validation.js";
import { validUser } from "../middleware/user.middleware.js";
import { jwtTokenValidate } from "../middleware/auth.middleware.js";
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
  router.get("/associated-users", jwtTokenValidate, getAgentAssociatedUsers);
  router.get("/:id", jwtTokenValidate, findOneUser);
  router.post("/", validUser(createUserSchema),createUser);
  router.patch("/add-balance/:id", jwtTokenValidate, addBalance);
  router.patch("/remove-balance/:id", jwtTokenValidate, removeBalance);
  router.patch("/:id", jwtTokenValidate, updateUser);
  router.delete("/:id", jwtTokenValidate, deleteUser);
  app.use("/user", router);
};
