const createError = require("http-errors");
const AuthService = require("../services/auth.service");

class AuthController {
  static login = async (request, response, message) => {
    try {
      const auth = new Buffer.from(request.headers.authorization.split(' ')[1], 'base64').toString().split(':')

      const payload = {
        email: auth[0],
        password: auth[1],
      };

      const access = await AuthService.login(payload);

      response.status(200).json(access);
    } catch (error) {
      console.log(error)
      
      message(createError(error.statusCode, error.message));
    }
  };
}

module.exports = AuthController;
