const express = require("express");
const router = express.Router();

const { create, getAll, update, deletePost } = require("../controllers/post");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, getAll);
router.post("/create", verifyToken, create);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
