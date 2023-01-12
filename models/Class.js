const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const classSchema = new Schema({
  className: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = Class = model("class", classSchema);
