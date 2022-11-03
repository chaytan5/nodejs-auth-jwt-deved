const express = require("express");
const Router = express.Router();
const User = require("../models/User.model");

Router.post("/register", (req, res) => {
	res.send("Registered successfully");
});

module.exports = Router;
