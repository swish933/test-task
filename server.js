const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connect } = require("./database/connection");
const { generateMiddleWare } = require("./middleware/generateMiddleware");
const { registerSchema } = require("./validation/register.validation");
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.post("/register", generateMiddleWare(registerSchema), (req, res) => {
	res
		.status(201)
		.send({ message: "User registration successful", data: req.body });
});

app.all("*", (req, res) => {
	res.status(404).send({ message: "Route not found!" });
});

connect().then(() => {
	console.log("Connected to MongoDB");

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
