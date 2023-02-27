const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  isadmin: { type: Boolean, default: false },
  professor: { type: Boolean, default: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  sexe: { type: String, require: true },
  specialite: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  classes: [{ type: Schema.Types.ObjectId, ref: "Class" }],
});

 module.exports = User = model("user", userSchema);
