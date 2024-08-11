require("dotenv").config();
require("express-async-errors");

//const cors = require("cors");
const express = require("express");
const path = require("path");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});
//const fileupload = require("express-fileupload");

const errorHanlderModdleware = require("./middleware/error-handler");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const getMediaRouter = require("./routes/getMediaRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

//app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));
app.set("trust proxy", 1);
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, //15min
		limit: 100,
		message: "you have reach the visit limit, please try again later",
	})
);

//app.use(xss());
/* app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			imgSrc: [
				"'self'",
				"data:",
				"https://image.tmdb.org",
				"https://media.themoviedb.org",
				"https://i.ytimg.com",
			],
			styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles
			frameSrc: ["'self'", "https://www.youtube.com"], // Allow framing from YouTube
			scriptSrc: ["'self'", "https://cdn.tailwindcss.com"], // Allow Tailwind CDN
			fontSrc: ["'self'", "https://fonts.googleapis.com"], // Allow Google Fonts
			// other directives...
		},
	})
); */

app.use(express.json());
//app.use(morgan("dev"));
app.use(cookieParser(process.env.JWT_SECRET));
//app.use(fileupload({ useTempFiles: true }));

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
