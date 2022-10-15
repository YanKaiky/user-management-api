require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const sortName = require("../../utils/sort.name");
const CountriesService = require("./countries.service");
const StatesService = require("./states.service");
const prisma = new PrismaClient();

class CitiesService {
  static createCity = async (payload) => {
    const city = await prisma.cities.create({ data: payload });

    const state = await StatesService.getStateByGuid(payload.state_guid);

    if (!state) throw createError.NotFound("STATE_NOT_FOUND");

    return city;
  };

  static getAllCities = async () => {
    const cities = await prisma.cities.findMany();

    const payload = []

    for (const city of cities) {
      const state = await StatesService.getStateByGuid(city.state_guid);

      if (!state) throw createError.NotFound("STATE_NOT_FOUND");

      const country = await CountriesService.getCountryByGuid(state.country_guid);

      if (!country) throw createError.NotFound("COUNTRY_NOT_FOUND");

      const data = {
        ...city,
        state: state.name,
        country: country.name,
      }

      payload.push(data)
    }

    sortName(payload);

    return payload;
  };

  static getCitiesByState = async (state_guid) => {
    const state = await prisma.states.findUnique({
      where: {
        guid: state_guid,
      },
    });

    if (!state) throw createError.NotFound("STATE_NOT_FOUND");

    const cities = await prisma.cities.findMany({
      where: {
        state_guid,
      }
    })

    return cities;
  };

  static getCityByGuid = async (guid) => {
    const city = await prisma.cities.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!city) throw createError.NotFound("CITY_NOT_FOUND");

    return city;
  };

  static updateCity = async (payload, guid) => {
    const city = await prisma.cities.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!city) throw createError.NotFound("CITY_NOT_FOUND");

    if (payload.state_guid) {
      const state = await StatesService.getStateByGuid(payload.state_guid);

      if (!state) throw createError.NotFound("STATE_NOT_FOUND");
    }

    const updateCity = await prisma.cities.update({
      where: {
        guid: guid,
      },
      data: payload,
    });

    return updateCity;
  };

  static deleteCity = async (guid) => {
    const city = await prisma.cities.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!city) throw createError.NotFound("CITY_NOT_FOUND");

    await prisma.cities.delete({
      where: {
        guid: guid,
      },
    });
  };
}

module.exports = CitiesService;
