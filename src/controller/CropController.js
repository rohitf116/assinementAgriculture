const mongoose = require("mongoose");
const CropModel = require("../model/CropModel");
const { isValid, nameValidation } = require("../validations/validations");
const { isValid: isVaildId } = mongoose.Types.ObjectId;

exports.plantCrop = async (req, res) => {
  try {
    const { name, plantSeason, field } = req.body;
    //name
    if (!isValid(name)) {
      return res
        .status(400)
        .json({ status: false, message: "Name must be present" });
    }
    if (!nameValidation(name)) {
      return res
        .status(400)
        .json({ status: false, message: "Name must be valid character" });
    }
    const checkForName = await CropModel.findOne({ name });
    if (checkForName) {
      return res
        .status(400)
        .json({ status: false, message: "This name is already being used" });
    }
    if (!isValid(plantSeason)) {
      return res
        .status(400)
        .json({ status: false, message: "plantSeason must be present" });
    }
    if (
      plantSeason !== "KHARIB" ||
      plantSeason !== "RABI" ||
      plantSeason !== "ZAID"
    ) {
      return res.status(400).json({
        status: false,
        message: "plantSeason must be valid character",
      });
    }
    if (!isValid(field)) {
      return res
        .status(400)
        .json({ status: false, message: "field must be present" });
    }
    if (!isVaildId(field)) {
      return res
        .status(400)
        .json({ status: false, message: "field is invalid" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
