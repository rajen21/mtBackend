import db from "../models/index.js";

const Version = db.version;

export async function updateVersion(req, res) {
  try {
    const { version, message } = req.body;
    const [{ _id }] = await Version.find();
    const response = await Version.findByIdAndUpdate(
      _id,
      { version, message, date: new Date() },
      { new: true }
    );
    return res.send(response);
  } catch (err) {
    console.log("err");
  }
}

export async function getVersion(req, res) {
  try {
    const [response] = await Version.find();
    return res.send(response);
  } catch (err) {
    return res.status(500).send("Error occured while getting version");
  }
}
