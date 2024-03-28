const { Schema, model } = require("mongoose");

// Schema
const userSchema = Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	gender: {
		type: String,
	},
	address: {
		type: String,
	},
});

// Model
const User = model("User", userSchema, undefined, {
	timestamps: true,
});

module.exports = User;
