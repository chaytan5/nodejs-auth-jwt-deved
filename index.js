const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");

mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB"));

app.use("/api/user", authRoutes);

app.listen(3001, () => console.log("Server running on port: 3000"));
