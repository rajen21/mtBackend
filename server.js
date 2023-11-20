import express from "express";
import "dotenv/config.js";
import cors from "cors";

import db from "./app/models/index.js";
import userRoutes from "./app/routes/user.routes.js";
import loginRoutes from "./app/routes/login.routes.js";
import marketRoutes from "./app/routes/market.routes.js";
import statementRoutes from "./app/routes/statement.routes.js";

const app = express();

const corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
marketRoutes(app);
statementRoutes(app);

const PORT = parseInt(process.env.PORT || 8081);

app.listen(PORT, () => {
    console.log(`Server is running on port `, PORT);
});