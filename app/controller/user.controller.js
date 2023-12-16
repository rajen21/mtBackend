import bcrypt from "bcryptjs";

import db from "../models/index.js";
const User = db.user;
const Statement = db.statement;

export async function createUser(req, res) {
  try {
    const { user_name, password, role } = req.body;

    if (!user_name) {
      return res.status(400).send({ message: "user name is required" });
    } else if (!password) {
      return res.status(400).send({ message: "password is required" });
    } else if (!role) {
      return res.status(400).send({ message: "role is required" });
    }

    const hashPass = await bcrypt.hash(req.body.password, 15);

    const userData = { user_name, password: hashPass, role };
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

    const data = await user.save();

    return res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function findOneUser(req, res) {
  try {
    const { id } = req.params;

    const data = await User.findById(id, { password: 0 });

    return res.send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function getAgentAssociatedUsers(req, res) {
  try {
    const filter = { agentId: req.query.agentId };
    if (!!req.query.user_name) {
      filter.user_name = { $regex: new RegExp(req.query.user_name, "i") };
    }
    const associatedUsers = await User.find(filter, { password: 0 });
    return res.send(associatedUsers);
  } catch (err) {
    return res.status(500).send("Error occured while fetching users!");
  }
}

export async function updateUser(req, res) {
  if (!req.body) {
    res.status(500).send({ message: "Please enter valid data" });
    return;
  }

  try {
    const { oldPassword, newPassword, ...rest } = req.body;
    const patchUser = rest;

    let isPasswordValid;
    if (oldPassword && newPassword) {
      const user = await User.findById(req.params.id);
      isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (isPasswordValid) {
        const newHashedPassword = await bcrypt.hash(newPassword, 15);
        patchUser.password = newHashedPassword;
      } else {
        return res.status(500).send("Please enter correct Password!");
      }
    }
    const data = await User.findByIdAndUpdate(req.params.id, patchUser, {
      new: true,
    });
    return res.send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const data = await User.findByIdAndRemove(id);
    return res.send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
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

export async function addWinningAmount(userData) {
  try {
    const foundUser = await User.findById(userData.userId);
    let totalAmount = parseFloat(foundUser.balance);
    if (foundUser) {
      const statement = new Statement({
        userId: userData.userId,
        amount: userData.amount,
        type: "Won",
      });
      totalAmount += parseFloat(userData.amount);
      await User.findByIdAndUpdate(userData.userId, { balance: totalAmount });
      console.log("added winning ammount in ", userData.userId, totalAmount);
      await statement.save();
      console.log("added statementalso");
      // { new: true }
    }
  } catch (err) {
    console.error("error while adding winning amount:: , ", userData);
  }
}
