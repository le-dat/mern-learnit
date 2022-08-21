require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

// user already login
module.exports.userAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(401).json({ success: false, message: "User not found" });
    return res.status(201).json({ success: true, message: "User login", user });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "server error" });
  }
};

module.exports.register = async (req, res, next) => {
  const { name, password } = req.body;

  // Simple validation
  if (!name || !password) {
    return res.status(401).json({ success: false, message: "Missing username or password" });
  }

  try {
    const user = await User.findOne({ name: name });
    if (user) {
      return res.json({ success: false, message: "This name already use" });
    }
    const hashPassword = await argon2.hash(password);
    const newUser = new User({
      name,
      password: hashPassword,
    });
    await newUser.save();

    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
    return res.json({ success: true, message: "User created successfully", accessToken });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "server error" });
  }
};

module.exports.login = async (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(401).json({ success: false, message: "Missing username or password" });
  }

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not exists" });
    }
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res.status(401).json({ success: false, message: "Password incorrect" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ success: true, message: "User logged successfully", accessToken });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "server error" });
  }
};
