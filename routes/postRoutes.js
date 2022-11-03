const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

router.get("/", verify, async (req, res) => {
	const user = req.user;

	res.json({
		userID: user.id,
		message: "you are logged in",
		post: "only logged in user can see this post",
	});
});

module.exports = router;
