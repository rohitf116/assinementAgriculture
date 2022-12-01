const mongoose = require("mongoose");
const FieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    crops: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Field", FieldSchema);
