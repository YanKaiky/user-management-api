require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const sortName = require("../../utils/sort.name");
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

      const data = {
        ...city,
        state: state.name,
      }

      payload.push(data)
    }

    sortName(payload);

    return payload;
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
