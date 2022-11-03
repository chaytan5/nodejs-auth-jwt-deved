const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
	// validate user data
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	});

	try {
		await user.save();
		res.json({ id: user._id, message: "User successfully added" });
	} catch (error) {
		if (error.code === 11000) {
			res.status(400).send("Email already exists");
		} else {
			res.status(400).send(error);
		}
	}
});

router.post("/login", async (req, res) => {
	// validate user data
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// check if user exists in database
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return res.status(400).json({ message: "Email or password is incorrect" });

	// check if password is correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass)
		return res.status(400).json({ message: "password is incorrect" });

	// res.send("Logged In");

	const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
	res.setHeader("auth-token", token).send(token);
});

module.exports = router;
