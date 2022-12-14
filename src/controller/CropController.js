const mongoose = require("mongoose");
const CropModel = require("../model/CropModel");
const FieldModel = require("../model/FieldModel");
const { isValid, nameValidation } = require("../validations/validations");
const { isValid: isVaildId } = mongoose.Types.ObjectId;

exports.plantCrop = async (req, res) => {
  try {
    const { name, plantSeason, field } = req.body;
    if (!Object.keys(req.body).length) {
      res.status(400).json({ status: false, message: "Body cannot be empty" });
    }
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
    const checkForName = await CropModel.findOne({ name, field });
    if (checkForName) {
      return res
        .status(400)
        .json({ status: false, message: "This crop is growing in this field" });
    }
    if (!isValid(plantSeason)) {
      return res
        .status(400)
        .json({ status: false, message: "plantSeason must be present" });
    }
    if (
      !(
        plantSeason == "KHARIB" ||
        plantSeason == "RABI" ||
        plantSeason == "ZAID"
      )
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
    let id = mongoose.Types.ObjectId(field);
    const fieldFound = await FieldModel.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: "cropcyclefields",
          foreignField: "_id",
          localField: "cycle",
          as: "cycle",
        },
      },
      {
        $match: { "cycle.cropsCanGrow": { $in: [name] } },
      },
    ]);
    if (!fieldFound.length) {
      return res
        .status(400)
        .json({ status: false, message: "This crop cannot be grown here" });
    }
    const cropPlanted = await CropModel.create({ name, plantSeason, field });

    res.status(201).json({
      status: true,
      message: "Succesfully created",
      data: cropPlanted,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
