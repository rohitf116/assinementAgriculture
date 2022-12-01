exports.isValid = (str) => {
  if (str === undefined || str === null) return false;
  if (typeof str === "string" && str.length === 0) return false;
  return true;
};

//regex
exports.nameValidation = (str) => {
  if (!/^[a-zA-Z0-9_.-]*$/.test(str)) return false;
  return true;
};
