const FieldModel = require("../model/FieldModel");
const { isValid, nameValidation } = require("../validations/validations");
exports.createField = async (req, res) => {
  const { name, country, state, city } = req.body;
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
  const checkForName = await FieldModel.findOne({ name });
  if (checkForName) {
    return res
      .status(400)
      .json({ status: false, message: "This name is already being used" });
  }
  //country
  if (!isValid(country)) {
    return res
      .status(400)
      .json({ status: false, message: "country must be present" });
  }
  if (!nameValidation(country)) {
    return res
      .status(400)
      .json({ status: false, message: "country must be valid character" });
  }
  //state
  if (!isValid(state)) {
    return res
      .status(400)
      .json({ status: false, message: "state must be present" });
  }
  if (!nameValidation(state)) {
    return res
      .status(400)
      .json({ status: false, message: "state must be valid character" });
  }
  //city
  if (!isValid(city)) {
    return res
      .status(400)
      .json({ status: false, message: "city must be present" });
  }
  if (!nameValidation(city)) {
    return res
      .status(400)
      .json({ status: false, message: "city must be valid character" });
  }
  const fieldCreated = await FieldModel.create({
    name,
    country,
    state,
    city,
  });

  res.status(201).json({
    status: false,
    message: "Succefully created",
    data: fieldCreated,
  });
};

exports.getAllCrops = async (req, res) => {
  const allData = await FieldModel.find().populate("cycle");
  console.log(allData, "allData");
  res
    .status(200)
    .json({ status: true, message: "Successfuly received", data: allData });
};

exports.getDataByQuery = async (req, res) => {
  const { crop } = req.query;
  console.log(crop, "crop");
  const allData = await FieldModel.aggregate([
    {
      $lookup: {
        from: "cropcyclefields",
        foreignField: "_id",
        localField: "cycle",
        as: "cycle",
      },
    },
    {
      $match: { "cycle.cropsCanGrow": { $in: [crop] } },
    },
  ]);
  res
    .status(200)
    .json({ status: true, message: "Successfuly received", data: allData });
};
