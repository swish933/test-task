const generateMiddleWare = (schema) => {
	return (req, res, next) => {
		// Middleware logic
		if (schema) {
			const result = schema.validate(req.body);
			if (result.error) {
				return res
					.status(400)
					.json({ message: "Validation error", errors: result.error });
			}
		}
		next();
	};
};

module.exports = { generateMiddleWare };
