const createError = require("http-errors");
const CitiesService = require("../services/cities.service");

class CitiesController {
  static createCity = async (request, response, message) => {
    try {
      const payload = {
        name: request.body.name,
        uf: request.body.uf
      };

      const city = await CitiesService.createCity(payload);

      response.status(201).json(city);
    } catch (error) {
      console.log(error)

      message(createError(error.statusCode, error.message));
    }
  };

  static getAllCities = async (_, response, message) => {
    try {
      const cities = await CitiesService.getAllCities();

      response.status(200).json(cities);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static getCityByGuid = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const city = await CitiesService.getCityByGuid(guid);

      response.status(200).json(city);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static updateCity = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const payload = {
        name: request.body.name,
        uf: request.body.uf
      };

      const city = await CitiesService.updateCity(payload, guid);

      response.status(200).json(city);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static deleteCity = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      await CitiesService.deleteCity(guid);

      response.status(200).json({ message: "Successful deleted" });
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };
}

module.exports = CitiesController;
