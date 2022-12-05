const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const CropSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    plantSeason: {
      type: String,
      enum: ["KHARIB", "RABI", "ZAID"],
      required: true,
    },
    field: { type: ObjectId, ref: "Field" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", CropSchema);
