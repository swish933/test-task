const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { connect } = require("./database/connection");
const { generateMiddleWare } = require("./middleware/generateMiddleware");
const { registerSchema } = require("./validation/register.validation");
const User = require("./database/schema/user.schema");

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.post("/register", generateMiddleWare(registerSchema), async (req, res) => {
	const userData = req.body;

	try {
		const user = await User.findOne({ email: userData.email });
		if (user) {
			return res
				.status(400)
				.send({ errors: { details: [{ message: "User already exists" }] } });
		}
		const newUser = await User.create(userData);
		res
			.status(201)
			.send({ message: "User registration successful", data: newUser });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server error");
	}
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
