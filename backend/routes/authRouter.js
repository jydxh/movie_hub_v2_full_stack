const express = require("express");
const { register } = require("../controller/authController");
const pre_register = require("../middleware/authMiddleware/pre_register");

const router = express.Router();

router.post("/register", pre_register, register);

module.exports = router;
