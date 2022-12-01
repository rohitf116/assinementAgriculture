const mongoose = require("mongoose");
const OrganizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: {
      street: { type: String },
      city: { type: String },
      pincode: { type: Number },
    },
    product: { type: [String], default: [] },
    country: { type: String, required: true },
    plots: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
