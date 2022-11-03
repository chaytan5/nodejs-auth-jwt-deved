const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 1024,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
