const createError = require("http-errors");
const PeopleService = require("../services/people.service");

class PeopleController {
  static createPeople = async (request, response, message) => {
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

      const people = await PeopleService.createPeople(payload);

      response.status(201).json(people);
    } catch (error) {
      console.log(error)
      
      message(createError(error.statusCode, error.message));
    }
  };

  static getAllPeople = async (_, response, message) => {
    try {
      const peoples = await PeopleService.getAllPeople();

      response.status(200).json(peoples);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static getPeopleByGuid = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      const people = await PeopleService.getPeopleByGuid(guid);

      response.status(200).json(people);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static updatePeople = async (request, response, message) => {
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

      const people = await PeopleService.updatePeople(payload, guid);

      response.status(200).json(people);
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };

  static deletePeople = async (request, response, message) => {
    try {
      const guid = request.params.guid;

      await PeopleService.deletePeople(guid);

      response.status(200).json({ message: "Successful deleted" });
    } catch (error) {
      console.log(error)
      message(createError(error.statusCode, error.message));
    }
  };
}

module.exports = PeopleController;
