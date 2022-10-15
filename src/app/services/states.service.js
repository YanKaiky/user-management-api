require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const createError = require("http-errors");
const sortName = require("../../utils/sort.name");
const CountriesService = require("./countries.service");
const prisma = new PrismaClient();

class StatesService {
  static createState = async (payload) => {
    const state = await prisma.states.create({ data: payload });

    const country = await CountriesService.getCountryByGuid(payload.country_guid);

    if (!country) throw createError.NotFound("COUNTRY_NOT_FOUND");

    return state;
  };

  static getAllStates = async () => {
    const states = await prisma.states.findMany();

    const payload = []

    for (const state of states) {
      const country = await CountriesService.getCountryByGuid(state.country_guid);

      if (!country) throw createError.NotFound("COUNTRY_NOT_FOUND");

      const data = {
        ...state,
        country: country.name,
      }

      payload.push(data)
    }

    sortName(payload);

    return payload;
  };

  static getStatesByCountry = async (country_guid) => {
    const country = await prisma.countries.findUnique({
      where: {
        guid: country_guid,
      },
    });

    if (!country) throw createError.NotFound("COUNTRY_NOT_FOUND");

    const states = await prisma.states.findMany({
      where: {
        country_guid,
      }
    })

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

    if (payload.country_guid) {
      const country = await CountriesService.getCountryByGuid(payload.country_guid);

      if (!country) throw createError.NotFound("COUNTRY_NOT_FOUND");
    }

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
