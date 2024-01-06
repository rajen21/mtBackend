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
      // user_name,
      name,
      adminId,
      phone,
      agentId,
      role,
      active,
    } = await User.findOne({ phone: req.body.phone });

    if (!active) {
      return res.status(403).send({
        inactivity:
          "Your account is currently inactive. Please contact support for assistance.",
      });
    }

    let agent;
    let admin;

    if (role === "user") {
      agent = await User.findById(agentId);
      if (!agent.active) {
        return res.status(403).send({
          inactivity:
            "The administrator account is currently inactive. Please contact support for assistance.",
        });
      }
    }
    if (role !== "admin") {
      admin = await User.findById(adminId);
      if (!admin.active) {
        return res.status(403).send({
          inactivity:
            "The server is currently undergoing maintenance. We apologize for any inconvenience. Please try again later.",
        });
      }
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, password);
    if (isPasswordValid) {
      const accessToken = jwt.sign(
        {
          id: _id,
          // user_name,
          phone,
          name,
          password,
          adminId,
          agentId,
          role,
          active,
          balance,
        },
        "mtSecret007"
        // { expiresIn: "1h" }
      );
      // const refreshToken = jwt.sign(
      //   {
      //     id: _id,
      //     user_name,
      //     password,
      //     adminId,
      //     agentId,
      //     role,
      //     active,
      //     balance,
      //   },
      //   "mtSecret007",
      //   // { expiresIn: "1d" }
      // );

      return (
        res
          // .cookie("refreshToken", refreshToken, {
          //   httpOnly: true,
          //   sameSite: "strict",
          // })
          .header("Authorization", accessToken)
          .send({
            id: _id,
            // user_name,
            phone,
            name,
            adminId,
            agentId,
            role,
            active,
          })
      );
    } else {
      return res.status(401).send({ password: "Worng password" });
    }
  } catch (err) {
    return res.status(404).send({ phone: "Incorrect Phone number" });
  }
}

export async function logoutUser(req, res) {
  try {
    jwt.sign("", "mtSecret007");
    return res.json({});
  } catch (err) {
    return res.status(500).send("error while log out");
  }
}

export async function isUserExist(req, res) {
  try {
    if (!req.body.phone) {
      return res.status(400).send("Phone number is required");
    }
    const user = await User.find({ phone: req.body.phone });
    let response = { action: user.phone ? "login" : "register" };
    return res.send(response);
  } catch (err) {
    return res.status(500).send("Error occurred while finding user");
  }
}

// export async function refreshLoginToken(req, res) {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) {
//     return res.status(401).send("Access Denied. No refresh token provided.");
//   }
//   try {
//     const decoded = jwt.verify(refreshToken, "mtSecret007");

//     const accessToken = jwt.sign(decoded, "mtSecret007", {
//       expiresIn: "1h",
//     });
//     const { password, ...rest } = decoded;
//     return res.header("Authorization", accessToken).send(rest);
//   } catch (err) {
//     return res.status(400).send("Invalid refresh token.");
//   }
// }
