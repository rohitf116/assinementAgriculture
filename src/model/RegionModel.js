const mongoose = require("mongoose");
const RegionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cropCycleProperty: { type: [String], default: [] },
  },
  { timestamps: true }
);
