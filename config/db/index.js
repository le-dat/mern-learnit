const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mern-learnit.x2bqdo5.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Connect successfully");
  } catch (err) {
    console.log("Connect failed" + err);
  }
};
