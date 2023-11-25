import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import db from "../models/index.js";
const User = db.user;

export async function loginUser(req, res) {
  try {
    const {
      password,
      balance,
      _id,
      user_name,
      adminId,
      agentId,
      role,
      active,
    } = await User.findOne({ user_name: req.body.user_name });
    const isPasswordValid = await bcrypt.compare(req.body.password, password);
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          id: _id,
          user_name,
          password,
          adminId,
          agentId,
          role,
          active,
          balance,
        },
        "secret123"
      );
      return res.send({
        token,
        id: _id,
        user_name,
        adminId,
        agentId,
        role,
        active,
      });
    } else {
      return res.status(401).send({ password: "Worng password" });
    }
  } catch (err) {
    return res.status(404).send({ user_name: "Incorrect username" });
  }
}

export async function logoutUser(req, res) {
  try {
    jwt.sign("", "secret123");
    return res.json({});
  } catch (err) {
    return res.status(500).send("error while log out");
  }
}
