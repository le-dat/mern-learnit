const express = require("express");
const router = express.Router();

const { register, login, userAuth } = require("../controllers/user");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, userAuth);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
