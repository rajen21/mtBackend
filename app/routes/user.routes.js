import { Router } from "express";
import { createUserSchema } from "../validations/user.validation.js";
import { validUser } from "../middleware/user.middleware.js";
import {
  createUser,
  deleteUser,
  findOneUser,
  updateUser,
  getAllUsers,
  addBalance,
} from "../controller/user.controller.js";

export default (app) => {
  const router = Router();
  router.get("/:id", findOneUser);
  router.get("/", getAllUsers);
  router.post("/", validUser(createUserSchema), createUser);
  router.patch("/add-balance/:id", addBalance);
  router.patch("/:id", updateUser);
  router.delete("/:id", deleteUser);
  app.use("/user", router);
};
