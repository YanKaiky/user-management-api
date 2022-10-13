const createError = require("http-errors");
const StatesService = require("../services/states.service");

class StatesController {
  static createState = async (request, response, message) => {
    try {
      const payload = {
        name: request.body.name,
        uf: request.body.uf,
        country_guid: request.body.country_guid,
      };

      const state = await StatesService.createState(payload);

      response.status(201).json(state);
    } catch (error) {
      console.log(error)

      message(createError(error.statusCode, error.message));
    }
  };

  static getAllStates = async (_, response, message) => {
    try {
      const states = await StatesService.getAllStates();

      response.status(200).json(states);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static getStateByGuid = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const state = await StatesService.getStateByGuid(guid);

      response.status(200).json(state);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static updateState = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const payload = {
        name: request.body.name,
        uf: request.body.uf,
        country_guid: request.body.country_guid,
      };

      const state = await StatesService.updateState(payload, guid);

      response.status(200).json(state);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static deleteState = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      await StatesService.deleteState(guid);

      response.status(200).json({ message: "Successful deleted" });
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };
}

module.exports = StatesController;
