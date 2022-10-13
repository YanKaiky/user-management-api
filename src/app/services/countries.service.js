require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const sortName = require("../../utils/sort.name");
const prisma = new PrismaClient();

class CountriesService {
  static createCountry = async (payload) => {
    const country = await prisma.countries.create({ data: payload });

    return country;
  };

  static getAllCountries = async () => {
    const countries = await prisma.countries.findMany();

    sortName(countries);

    return countries;
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
