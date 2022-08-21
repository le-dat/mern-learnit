require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./config/db");
const router = require("./routers");

// connect db mongoose
db.connect();

// bodyPasser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routers
router(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
