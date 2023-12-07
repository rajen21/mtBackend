import db from "../models/index.js";

const Version = db.version;

export async function updateVersion(req, res) {
  const { version, message } = req.body;
  const { id } = req.params;
  try {
    const response = await Version.findByIdAndUpdate(
      id,
      { version, message },
      { new: true }
    );
    return res.send(response);
  } catch (err) {
    console.log("err");
  }
}

export async function getVersion(req, res) {
  try {
    const { id } = req.params;
    const response = await Version.findById(id);
    return res.send(response);
  } catch (err) {
    return res.status(500).send("Error occured while getting version");
  }
}
