require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const sortName = require("../../utils/sort.name");
const prisma = new PrismaClient();

class ContinentsService {
  static createContinent = async (payload) => {
    const continent = await prisma.continents.create({ data: payload });

    return continent;
  };

  static getAllContinents = async () => {
    const continents = await prisma.continents.findMany();

    sortName(continents);

    return continents;
  };

  static getContinentByGuid = async (guid) => {
    const continent = await prisma.continents.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!continent) throw createError.NotFound("CONTINENT_NOT_FOUND");

    return continent;
  };

  static updateContinent = async (payload, guid) => {
    const continent = await prisma.continents.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!continent) throw createError.NotFound("CONTINENT_NOT_FOUND");

    const updateContinent = await prisma.continents.update({
      where: {
        guid: guid,
      },
      data: payload,
    });

    return updateContinent;
  };

  static deleteContinent = async (guid) => {
    const continent = await prisma.continents.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!continent) throw createError.NotFound("CONTINENT_NOT_FOUND");

    await prisma.continents.delete({
      where: {
        guid: guid,
      },
    });
  };
}

module.exports = ContinentsService;
