const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { registerValidation } = require("../validation");
const bcrypt = require("bcryptjs");

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

module.exports = router;
