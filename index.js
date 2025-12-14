import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/dbConfig.js";
import authRoute from "./Routers/user.router.js";

dotenv.config();

// express
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

connectDB();

// default Route
app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1 style='text-align:center;'>Welcome to Backend (UserAuth)</h1>");
});

// custom route
app.use("/api/auth", authRoute);
//port and listen
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at the port ${port}`);
});
