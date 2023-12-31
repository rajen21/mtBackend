import bcrypt from "bcryptjs";

import db from "../models/index.js";
const User = db.user;
const Statement = db.statement;

export async function createUser(req, res) {
  try {
    const { name, password, role, phone } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Name is require" });
    } else if (!password) {
      return res.status(400).send({ message: "Password is require" });
    } else if (!role) {
      return res.status(400).send({ message: "Role is require" });
    } else if (!phone) {
      return res.status(400).send({ message: "Phone number is require" });
    }
    if (!/^(?:(\+?91)|0)?([6-9]\d{9})$/.test(phone)) {
      return res.status(400).send({ message: "Phone number is invalid" });
    }
    const hashPass = await bcrypt.hash(password, 15);

    const userData = { name, password: hashPass, role, phone, active: true };

    const user = new User(userData);

    const data = await user.save();

    return res.send(data);
  } catch (err) {
    if (err.errors.phone.properties.message) {
      return res.status(500).send(err.errors.phone.properties.message);
    }
    return res.status(500).send("Error occurred while creating user");
  }
}

export async function findOneUser(req, res) {
  try {
    const { id } = req.params;

    const data = await User.findById(id, { password: 0 });

    return res.send(data);
  } catch (err) {
    return res.status(500).send("Error occurred while finding user");
  }
}

export async function findUsers(req, res) {
  try {
    const filter = {...req.query};
    if (filter.role === "user") {
      return res.status(403).send("Users do not have access to these");
    }
    if (!!filter.name) {
      filter.name = { $regex: new RegExp(req.query.name, "i") };
    }
    if (filter.searchRole) {
      filter.role = filter.searchRole;
      delete filter.searchRole;
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
    console.log("adding winnin amount...");
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
      console.log(
        "added winning ammount in ",
        userData.userId,
        totalAmount,
        userData.amount
      );
      await statement.save();
      console.log("added statementalso");
      // { new: true }
    }
  } catch (err) {
    console.error("error while adding winning amount:: , ", userData);
  }
}
