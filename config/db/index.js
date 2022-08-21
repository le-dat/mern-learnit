const mongoose = require("mongoose");

module.exports.connect = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.MONGODB}`);
    console.log("Connect successfully");
  } catch (err) {
    console.log("Connect failed" + err);
  }
};
