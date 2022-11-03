const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
	// validate user data
	const { error } = registerValidation(req.body);

	if (error) {
		res.status(400).send(error.details[0].message);
	} else {
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});

		try {
			const savedUser = await user.save();
			res.send(savedUser);
		} catch (error) {
			if (error.code === 11000) {
				res.status(400).send("Email already exists");
			} else {
				res.status(400).send(error);
			}
		}
	}
});

module.exports = router;
