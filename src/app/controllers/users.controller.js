const createError = require("http-errors");
const UsersService = require("../services/users.service");

class UsersController {
  static createUser = async (request, response, message) => {
    try {
      const payload = {
        name: request.body.name,
        last_name: request.body.last_name,
        password: request.body.password,
        email: request.body.email,
        cpf: request.body.cpf,
        city_guid: request.body.city_guid,
        birth_date: request.body.birth_date
      };

      const user = await UsersService.createUser(payload);

      response.status(201).json(user);
    } catch (error) {
      console.log(error)

      message(createError(error.statusCode, error.message));
    }
  };

  static getAllUsers = async (_, response, message) => {
    try {
      const users = await UsersService.getAllUsers();

      response.status(200).json(users);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static getUserByGuid = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const user = await UsersService.getUserByGuid(guid);

      response.status(200).json(user);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static updateUser = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const payload = {
        name: request.body.name,
        last_name: request.body.last_name,
        password: request.body.password,
        email: request.body.email,
        cpf: request.body.cpf,
        city_guid: request.body.city_guid,
        birth_date: request.body.birth_date
      };

      const user = await UsersService.updateUser(payload, guid);

      response.status(200).json(user);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static deleteUser = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      await UsersService.deleteUser(guid);

      response.status(200).json({ message: "Successful deleted" });
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };
}

module.exports = UsersController;
