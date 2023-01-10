const stringFile = require("../common/string_file.json");

exports.errHandler = (err, req, res, next) => {
  res.status(err.status ? err.status : 200).json({
    statusCode: err.status,
    message: err.message,
  });
};

exports.notFound = (req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    message: "404 not found",
  });
};

exports.unAuthorized = (res) => {
  return res.status(stringFile.AUTHORIZATION_ERROR_STATUS_CODE).send({
    message: stringFile.UNAUTHORISED_ACCESS_MESSAGE,
  });
};
