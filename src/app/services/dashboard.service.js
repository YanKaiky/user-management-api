const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DashboardService {
  static getValues = async () => {
    const continents = await prisma.continents.findMany({});
    const countries = await prisma.countries.findMany({});
    const states = await prisma.states.findMany({});
    const cities = await prisma.cities.findMany({});
    const users = await prisma.users.findMany({});

    const data = {
      continents: {
        values: continents,
        length: continents.length,
      },
      countries: countries.length,
      states: states.length,
      cities: cities.length,
      users: users.length,
    }

    return data;
  };
}

module.exports = DashboardService;
