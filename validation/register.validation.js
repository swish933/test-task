const Joi = require("joi");

const registerSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string().email().required(),
	gender: Joi.string(),
	address: Joi.string(),
});

module.exports = { registerSchema };
