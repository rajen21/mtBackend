import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import db from "../models/index.js";
const User = db.user;

export async function createUser(req, res) {
  const { user_name, password, role, active } = req.body;

  if (!user_name) {
    return res.status(400).send({ message: "user name is required" });
  } else if (!password) {
    return res.status(400).send({ message: "password is required" });
  } else if (!role) {
    return res.status(400).send({ message: "role is required" });
  } else if (!active) {
    return res.status(400).send({ message: "active is required" });
  }

  const hashPass = await bcrypt.hash(req.body.password, 15);

  const userData = { user_name, password: hashPass, role, active };
  if (role === "agent") {
    const validAdminId = await User.findById(req.body.adminId);
    userData.adminId = validAdminId;
  }
  if (role === "user") {
    const validAdminId = await User.findById(req.body.adminId);
    const validAgentId = await User.findById(req.body.agentId);
    userData.agentId = validAgentId;
    userData.adminId = validAdminId;
  }

  const user = new User(userData);

  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export async function findOneUser(req, res) {
  const { id } = req.params;
  User.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export async function getAgentAssociatedUsers(req, res) {
  try {
    const { agentId } = req.params;
    const associatedUsers = await User.find({agentId});
    res.send(associatedUsers);
  } catch (err) {
    res.status(500).send(err)
  }
}

export async function updateUser(req, res) {
  if (!req.body) {
    res.status(500).send({ message: "Please enter valid data" });
    return;
  }

  const { oldPassword, newPassword, ...rest } = req.body;
  const patchUser = rest;

  let isPasswordValid;
  if (oldPassword && newPassword) {
    const user = await User.findById(req.params.id);
    isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (isPasswordValid) {
      const newHashedPassword = await bcrypt.hash(newPassword, 15);
      patchUser.password = newHashedPassword;
    }
  }
  User.findByIdAndUpdate(req.params.id, patchUser)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.status(500).send("error while updating user", err);
    });
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.status(500).send("error while deleting user", err);
    });
}

export async function addBalance(req, res) {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    if (amount < 300) {
      return res.status(500).send("Please enter more than 300 amount");
    }
    const foundUser = await User.findById(id);
    if (!foundUser) return res.status(404).send("User not found");

    const totalAmount = foundUser.balance + amount;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { balance: totalAmount },
      { new: true }
    );
    return res.send(updatedUser);
  } catch (err) {
    return res.status(500).send("Error while adding balance", err);
  }
}

export async function removeBalance(req, res) {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const foundUser = await User.findById(id);
    if (!foundUser) return res.status(404).send("User not found");
    if (foundUser.balance < amount)
      return res.status(500).send("Insufficient balance");

    const totalAmount = foundUser.balance - amount;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { balance: totalAmount },
      { new: true }
    );
    return res.send(updatedUser);
  } catch (err) {
    return res.status(500).send("Error while removing balance", err);
  }
}
