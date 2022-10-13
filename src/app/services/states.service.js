require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const sortName = require("../../utils/sort.name");
const prisma = new PrismaClient();

class StatesService {
  static createState = async (payload) => {
    const state = await prisma.states.create({ data: payload });

    return state;
  };

  static getAllStates = async () => {
    const states = await prisma.states.findMany();

    sortName(states);

    return states;
  };

  static getStateByGuid = async (guid) => {
    const state = await prisma.states.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!state) throw createError.NotFound("STATE_NOT_FOUND");

    return state;
  };

  static updateState = async (payload, guid) => {
    const state = await prisma.states.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!state) throw createError.NotFound("STATE_NOT_FOUND");

    const updateState = await prisma.states.update({
      where: {
        guid: guid,
      },
      data: payload,
    });

    return updateState;
  };

  static deleteState = async (guid) => {
    const state = await prisma.states.findUnique({
      where: {
        guid: guid,
      },
    });

    if (!state) throw createError.NotFound("STATE_NOT_FOUND");

    await prisma.states.delete({
      where: {
        guid: guid,
      },
    });
  };
}

module.exports = StatesService;
