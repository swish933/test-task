const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connect } = require("./database/connection");

dotenv.config();

const PORT = process.env.PORT;
app.get("/", (req, res) => res.send("Hello World!"));

connect().then(() => {
	console.log("Connected to MongoDB");

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
