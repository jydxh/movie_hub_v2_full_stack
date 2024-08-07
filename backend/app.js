require("dotenv").config();
require("express-async-errors");

const express = require("express");
const errorHanlderModdleware = require("./middleware/error-handler");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const getMediaRouter = require("./routes/getMediaRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

app.set("trust proxy", 1);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1", getMediaRouter);

app.use(errorHanlderModdleware);
const port = process.env.PORT || 5000;

(async () => {
	try {
		await require("./db/connect")(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Example app listening on port ${port}!`)
		);
	} catch (err) {
		console.log(err);
	}
})();
