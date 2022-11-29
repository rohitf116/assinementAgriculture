const mongoose = require("mongoose");
const OrganizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    property: { region: { type: [String] }, field: { type: [String] } },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
