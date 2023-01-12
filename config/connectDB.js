const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("databse connected");
  } catch (error) {
    console.log("database is not connected", error);
  }
};

module.exports = connectDB;
