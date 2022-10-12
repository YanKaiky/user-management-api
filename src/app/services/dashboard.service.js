const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class DashboardService {
  static getValues = async () => {
    const people = await prisma.peoples.findMany({});
    const cities = await prisma.cities.findMany({});

    const data = {
      cities: cities.length,
      people: people.length,
      uf: 20,
    }

    return data;
  };
}

module.exports = DashboardService;
