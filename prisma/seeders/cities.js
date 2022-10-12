const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Cities {
  static cities = async () => {
    const citiesData = [
      {
        name: 'Los Angeles',
        uf: 'CA',
      },
      {
        name: 'New York',
        uf: 'NY',
      },
      {
        name: 'Orlando',
        uf: 'FL',
      },
      {
        name: 'Honolulu',
        uf: 'HI',
      },
    ]

    for (const city of citiesData) {
      await prisma.cities.create({
        data: city
      });
    }
  }
}

module.exports = Cities;
