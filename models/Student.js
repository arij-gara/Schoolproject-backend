const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  sexe: { type: String, require: true },
  presence: { type: Boolean, default: true },
});

module.exports = Student = model("student", studentSchema);
