const mongoose = require("mongoose");

const connect = async () => {
	const { MONGODB_URI } = process.env;

	if (MONGODB_URI) {
		return await mongoose.connect(MONGODB_URI);
	}
};

module.exports = { connect };
