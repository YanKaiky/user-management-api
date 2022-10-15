require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const sortName = require("../../utils/sort.name");
const ContinentsService = require("./continents.service");
const prisma = new PrismaClient();

class CountriesService {
  static createCountry = async (payload) => {
    const country = await prisma.countries.create({ data: payload });

    const continent = await ContinentsService.getContinentByGuid(payload.continent_guid);

    if (!continent) throw createError.NotFound("CONTINENT_NOT_FOUND");

    return country;
  };

  static getAllCountries = async () => {
    const countries = await prisma.countries.findMany();

    const payload = []

    for (const country of countries) {
      const continent = await ContinentsService.getContinentByGuid(country.continent_guid);

      if (!continent) throw createError.NotFound("CONTINENT_NOT_FOUND");

      const data = {
        ...country,
        continent: continent.name,
      }

      payload.push(data)
    }

    sortName(payload);

    return payload;
  };

  static getCountryByGuid = async (guid) => {
    const country = await prisma.countries.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!country) throw createError.NotFound("COUNTRY_NOT_FOUND");

    return country;
  };

  static updateCountry = async (payload, guid) => {
    const country = await prisma.countries.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!country) throw createError.NotFound("COUNTRY_NOT_FOUND");

    if (payload.continent_guid) {
      const continent = await ContinentsService.getContinentByGuid(payload.continent_guid);

      if (!continent) throw createError.NotFound("CONTINENT_NOT_FOUND");
    }

    const updateCountry = await prisma.countries.update({
      where: {
        guid: guid,
      },
      data: payload,
    });

    return updateCountry;
  };

  static deleteCountry = async (guid) => {
    const country = await prisma.countries.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!country) throw createError.NotFound("COUNTRY_NOT_FOUND");

    await prisma.countries.delete({
      where: {
        guid: guid,
      },
    });
  };
}

module.exports = CountriesService;
