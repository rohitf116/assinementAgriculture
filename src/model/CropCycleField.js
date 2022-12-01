const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const CropCycleFieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    month: { type: Number, required: true },
    field: { type: ObjectId, ref: "Field" },
    cropsCanGrow: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CropCycleField", CropCycleFieldSchema);
