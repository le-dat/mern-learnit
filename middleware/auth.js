require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Access token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId; // create prototype userId for req
    next();
  } catch (err) {
    console.log(err);
    return res.status(404).json({ success: false, message: "Invalid access token" });
  }
};
