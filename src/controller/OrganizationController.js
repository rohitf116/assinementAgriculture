const OrganizationModel = require("../model/OrganizationModel");
const { isValid, nameValidation } = require("../validations/validations");
exports.createOrganization = async (req, res) => {
  try {
    const { name, address, product, plots, country } = req.body;
    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json({ status: false, message: "Body cannot be empty" });
    }
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
    const checkForName = await OrganizationModel.findOne({ name });
    if (checkForName) {
      return res
        .status(400)
        .json({ status: false, message: "This name is already being used" });
    }
    if (!address) {
      return res
        .status(400)
        .json({ status: false, message: "address must be present" });
    }
    if (!address.street) {
      return res
        .status(400)
        .json({ status: false, message: "street must be present" });
    }
    if (!address.city) {
      return res
        .status(400)
        .json({ status: false, message: "city must be present" });
    }
    if (!address.pincode) {
      return res
        .status(400)
        .json({ status: false, message: "pincode  must be present" });
    }
    if (!isValid(address.street)) {
      return res
        .status(400)
        .json({ status: false, message: "street must be present" });
    }
    if (!nameValidation(address.street)) {
      return res
        .status(400)
        .json({ status: false, message: "street must be valid character" });
    }
    if (!isValid(address.city)) {
      return res
        .status(400)
        .json({ status: false, message: "city must be present" });
    }
    if (!nameValidation(address.city)) {
      return res
        .status(400)
        .json({ status: false, message: "city must be valid character" });
    }
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

    const organizationCreated = await OrganizationModel.create({
      name,
      address,
      product,
      plots,
      country,
    });

    res.status(201).json({
      status: true,
      message: "Successfully created",
      data: organizationCreated,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
