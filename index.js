const express = require("express");
const connectDB = require("./config/connectDB");

const app = express();
require("dotenv").config();

connectDB();

app.get("/", (req, res) => {
  res.status(200).send("hello from server");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app running on port ${port}..`);
});
