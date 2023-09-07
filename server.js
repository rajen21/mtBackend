import express from "express";
import "dotenv/config.js";
import db from "./app/models/index.js";

import userRoutes from "./app/routes/user.routes.js";
import loginRoutes from "./app/routes/login.routes.js";

const app = express();

app.use(express.json());

db.mongoose.connect(db.url)
.then(data => {
    console.log("Successfully connected to db!!");
})
.catch(err => {
    console.log("err" , err);
    process.exit();
});

app.get("/", (req, res) => {
    res.json({ message : "Welcome" })
});

loginRoutes(app);
userRoutes(app);

const PORT = parseInt(process.env.PORT || 8081);

app.listen(PORT, () => {
    console.log(`Server is running on port `, PORT);
});