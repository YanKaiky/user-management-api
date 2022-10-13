const createError = require("http-errors");
const ContinentsService = require("../services/continents.service");

class ContinentsController {
  static createContinent = async (request, response, message) => {
    try {
      const payload = {
        name: request.body.name,
      };

      const continent = await ContinentsService.createContinent(payload);

      response.status(201).json(continent);
    } catch (error) {
      console.log(error)

      message(createError(error.statusCode, error.message));
    }
  };

  static getAllContinents = async (_, response, message) => {
    try {
      const continents = await ContinentsService.getAllContinents();

      response.status(200).json(continents);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static getContinentByGuid = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const continent = await ContinentsService.getContinentByGuid(guid);

      response.status(200).json(continent);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static updateContinent = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const payload = {
        name: request.body.name,
      };

      const continent = await ContinentsService.updateContinent(payload, guid);

      response.status(200).json(continent);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static deleteContinent = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      await ContinentsService.deleteContinent(guid);

      response.status(200).json({ message: "Successful deleted" });
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };
}

module.exports = ContinentsController;
