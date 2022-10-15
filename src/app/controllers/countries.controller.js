const createError = require("http-errors");
const CountriesService = require("../services/countries.service");

class CountriesController {
  static createCountry = async (request, response, message) => {
    try {
      const payload = {
        name: request.body.name,
        continent_guid: request.body.continent_guid
      };

      const country = await CountriesService.createCountry(payload);

      response.status(201).json(country);
    } catch (error) {
      console.log(error)

      message(createError(error.statusCode, error.message));
    }
  };

  static getAllCountries = async (request, response, message) => {
    try {
      const continent_guid = request.query.continent_guid;

      let countries;

      if (continent_guid) countries = await CountriesService.getCountriesByContinent(continent_guid);

      if (!continent_guid) countries = await CountriesService.getAllCountries();

      response.status(200).json(countries);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static getCountryByGuid = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const country = await CountriesService.getCountryByGuid(guid);

      response.status(200).json(country);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static updateCountry = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const payload = {
        name: request.body.name,
        continent_guid: request.body.continent_guid
      };

      const country = await CountriesService.updateCountry(payload, guid);

      response.status(200).json(country);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static deleteCountry = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      await CountriesService.deleteCountry(guid);

      response.status(200).json({ message: "Successful deleted" });
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };
}

module.exports = CountriesController;
