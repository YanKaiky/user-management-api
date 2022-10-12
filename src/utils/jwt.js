require("dotenv").config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = {
  signAccessToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign({ payload }, accessTokenSecret, {}, (error, token) => {
        if (error) reject(createError.InternalServerError());

        resolve(token);
      });
    });
  },

  verifyAccessToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (error, payload) => {
        if (error) {
          const message =
            error.name == "JsonWebTokenError" ? "Unauthorized" : error.message;

          return reject(createError.Unauthorized(message));
        }

        resolve(payload);
      });
    });
  },
};
