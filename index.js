const express = require("express");
const connectDB = require("./config/connectDB");
const userRoute = require('./routes/users')
const authRoute = require ('./routes/auth')
const classesRoute = require('./routes/classes')
const studentsRoute = require('./routes/students')
const app = express();
var cors = require('cors');
app.use(cors());
require("dotenv").config();
app.use(express.json())
connectDB();

app.get("/", (req, res) => {
  res.status(200).send("hello from server");
});

app.use('/api/users/', userRoute)
app.use('/api/auth/', authRoute)
app.use('/api/classes/', classesRoute)
app.use('/api/students/', studentsRoute)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app running on port ${port}..`);
});
