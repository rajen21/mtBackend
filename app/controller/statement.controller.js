import db from "../models/index.js";
const Statement = db.statement;

export async function addStatement(req, res) {
  try {
    const statement = new Statement(req.body);

    const response = await statement.save();
    return res.send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error occurred while adding statement");
  }
}

export async function getAssociatedStatements(req, res) {
  try {
    const { userId } = req.params;
    const statements = await Statement.find({ userId });
    return res.send(statements);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred while finding statements");
  }
}
