const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const RegionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    regionAndField: { type: [ObjectId], ref: "Region" || "Field", default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Region", RegionSchema);
