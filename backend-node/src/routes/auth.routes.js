const express = require("express");
const router = express.Router();

const { validateSignup, validateLogin } = require("../validators/auth.validator");
const { signup, login } = require("../controllers/auth.controller");
const { authLimiter } = require("../middleware/rateLimit.middleware");

router.post("/signup", validateSignup, authLimiter, signup);
router.post("/login", validateLogin, authLimiter, login);

module.exports = router;

