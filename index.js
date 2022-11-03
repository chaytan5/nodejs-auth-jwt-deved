const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

mongoose
	.connect(process.env.DB_CONNECT)
	.then(() => {
		console.log("Connected to DB");
		app.listen(3001, () => console.log("Server running on port: 3001"));
	})
	.catch((err) => console.log(err));

//Middlewares
app.use(express.json());

// Route middleware
app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);
