const CropCycleFieldModel = require("../model/CropCycleField");
const { isValid, nameValidation } = require("../validations/validations");
const mongoose = require("mongoose");
const FieldModel = require("../model/FieldModel");
const { isValid: isVaildId } = mongoose.Types.ObjectId;
exports.createCropCycleField = async (req, res) => {
  const { name, month, field, cropsCanGrow } = req.body;
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
  //name
  if (!isValid(month)) {
    return res
      .status(400)
      .json({ status: false, message: "month must be present" });
  }
  if (!(month < 1 || month <= 13)) {
    return res
      .status(400)
      .json({ status: false, message: "month must be valid character" });
  }
  //name
  if (!isValid(field)) {
    return res
      .status(400)
      .json({ status: false, message: "field must be present" });
  }
  if (!isVaildId(field)) {
    return res.status(400).json({ status: false, message: "field valid id" });
  }
  const checkForField = await FieldModel.findById(field);
  if (!checkForField) {
    return res.status(404).json({ status: false, message: "field not found" });
  }

  const CropCycleFieldCreated = await CropCycleFieldModel.create({
    name,
    month,
    field,
    cropsCanGrow,
  });
  const cropsAdded = await FieldModel.findOneAndUpdate(
    { id: field },
    { $addToSet: { crops: cropsCanGrow } }
  );
  res.status(201).json({
    status: false,
    message: "Succefully created",
    data: CropCycleFieldCreated,
  });
};
