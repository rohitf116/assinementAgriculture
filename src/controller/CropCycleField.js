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

  //name
  if (!isValid(field)) {
    return res
      .status(400)
      .json({ status: false, message: "field must be present" });
  }
  if (!isVaildId(field)) {
    return res.status(400).json({ status: false, message: "field valid id" });
  }
  const checkForField = await FieldModel.findOne({ id: field });
  if (!checkForField) {
    return res.status(404).json({ status: false, message: "field not found" });
  }
  const check = await CropCycleFieldModel.findOne({
    field,
    cropsCanGrow: { $in: [cropsCanGrow] },
  });
  if (check) {
    return res.status(400).json({
      status: false,
      message: "this crop is already added in this field",
    });
  }
  const foundId = await CropCycleFieldModel.findOne({ field });
  if (foundId?.cropsCanGrow?.length) {
    const { _id: id } = foundId;
    const updated = await CropCycleFieldModel.findOneAndUpdate(
      { id },
      { $addToSet: { cropsCanGrow: cropsCanGrow } },
      { new: true }
    );
    const { _id } = foundId;
    await FieldModel.findOneAndUpdate(
      { id: field, cycle: { $nin: { _id } } },
      { $addToSet: { cycle: _id } }
    );
    return res
      .status(200)
      .json({ status: true, message: "Succesfully updated", data: updated });
  }
  const CropCycleFieldCreated = await CropCycleFieldModel.create({
    name,
    month,
    field,
    cropsCanGrow,
  });
  const { _id } = CropCycleFieldCreated;
  await FieldModel.findOneAndUpdate(
    { id: field, cycle: { $nin: { _id } } },
    { $addToSet: { cycle: _id } }
  );
  res.status(201).json({
    status: false,
    message: "Succefully created",
    data: CropCycleFieldCreated,
  });
};
