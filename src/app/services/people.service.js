require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const prisma = new PrismaClient();

class PeopleService {
  static createPeople = async (payload) => {
    payload.birth_date = new Date(payload.birth_date).toISOString()
    
    const people = await prisma.peoples.create({ data: payload });

    return people;
  };

  static getAllPeople = async () => {
    const people = await prisma.peoples.findMany();

    return people;
  };

  static getPeopleByGuid = async (guid) => {
    const people = await prisma.peoples.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!people) throw createError.NotFound("PEOPLE_NOT_FOUND");

    return people;
  };

  static updatePeople = async (payload, guid) => {
    const people = await prisma.peoples.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!people) throw createError.NotFound("PEOPLE_NOT_FOUND");

    if (payload.birth_date) payload.birth_date = new Date(payload.birth_date).toISOString()

    const updatePeople = await prisma.peoples.update({
      where: {
        guid: guid,
      },
      data: payload,
    });

    return updatePeople;
  };

  static deletePeople = async (guid) => {
    const people = await prisma.peoples.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!people) throw createError.NotFound("PEOPLE_NOT_FOUND");

    await prisma.peoples.delete({
      where: {
        guid: guid,
      },
    });
  };
}

module.exports = PeopleService;