const jwt = require("../../utils/jwt");
const createError = require("http-errors");

const auth = async (request, _, message) => {
  if (!request.headers.authorization) return message(createError.Unauthorized("Access token is required"));

  const token = request.headers.authorization.split(" ")[1];

  if (!token) return message(createError.Unauthorized());

  await jwt.verifyAccessToken(token).then((user) => {
    request.user = user;
    message();
  }).catch((e) => {
    message(createError.Unauthorized(e.message));
  });
};

module.exports = auth;
