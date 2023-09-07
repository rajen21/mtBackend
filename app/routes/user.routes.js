import {createUserSchema} from "../validations/user.validation.js";
import { validUser } from "../middleware/user.middleware.js";
import { createUser, deleteUser, findOneUser, updateUser } from "../controller/user.controller.js";
import { Router } from "express";

export default (app) => {
    const router = Router();
    router.get("/:id", findOneUser);
    router.post("/", validUser(createUserSchema), createUser);
    router.patch("/:id", updateUser);
    router.delete("/:id", deleteUser);
    app.use("/user", router);
}