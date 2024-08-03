require("dotenv").config();
require("express-async-errors");

const express = require("express");
const errorHanlderModdleware = require("./middleware/error-handler");
const morgan = require("morgan");
const app = express();
const router = require("./routes/router");

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", router);

app.use(errorHanlderModdleware);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
