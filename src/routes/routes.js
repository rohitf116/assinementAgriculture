const express = require("express");
const router = express.Router();
const { createOrganization } = require("../controller/OrganizationController");
const { createRegion } = require("../controller/RegionController");
const {
  createField,
  getAllCrops,
  getDataByQuery,
} = require("../controller/FieldController");
const { createCropCycleField } = require("../controller/CropCycleField");
router.post("/organigation", createOrganization);

router.post("/region", createRegion);
router
  .post("/field", createField)
  .get("/field", getDataByQuery)
  .get("/field", getAllCrops);

router.post("/cropcyclefield", createCropCycleField);

module.exports = router;
