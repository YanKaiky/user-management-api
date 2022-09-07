require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const sortName = require("../../utils/sort.name");
const prisma = new PrismaClient();

class CitiesService {
  static createCity = async (payload) => {
    const city = await prisma.cities.create({ data: payload });

    return city;
  };

  static getAllCities = async () => {
    const cities = await prisma.cities.findMany();

    sortName(cities);

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
