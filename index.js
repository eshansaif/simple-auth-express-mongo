require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const authRoute = require("./routes/authRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(DB_URL)
  .then(console.log("db is connected"))
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to the server",
  });
});

app.use(authRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
