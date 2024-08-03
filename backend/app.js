const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/v1", (req, res) => {
	res.status(200).json({ connect: "success!" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
