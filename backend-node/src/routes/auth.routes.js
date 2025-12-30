const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller");
const { authLimiter } = require("../middleware/rateLimit.middleware");
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);

module.exports = router;
