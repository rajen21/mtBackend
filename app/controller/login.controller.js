import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import db from "../models/index.js";
const User = db.user;

export async function loginUser (req, res) {
    try {
        const {_id, user_name, password, role, active} = await User.findOne({user_name: req.body.user_name});
        const isPasswordValid = await bcrypt.compare(req.body.password, password);
        if (isPasswordValid) {
            const token = jwt.sign({_id, user_name, password, role, active}, "secret123");
            return res.json({token, _id, user_name, role, active});
        } else {
            return res.status(500).send("Please enter valid password");
        }
    } catch(err) {
        return res.status(500).send("wrong credentials")
    }   
};

export async function logoutUser (req, res) {
    try {
        jwt.sign("", "secret123");
        return res.json({});
    } catch(err) {
        return res.status(500).send("error while log out");
    }
}