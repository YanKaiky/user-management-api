const { PrismaClient } = require('@prisma/client');
const Countries = require('./countries');
const prisma = new PrismaClient();

class Continents {
  static continents = async () => {
    const continents = [
      {
        name: 'Africa',
      },
      {
        name: 'Asia',
      },
      {
        name: 'Central America',
      },
      {
        name: 'Europe',
      },
      {
        name: 'North America',
      },
      {
        name: 'Oceania',
      },
      {
        name: 'South America',
      },
    ];

    const payload = [];

    for (const data of continents) {
      const value = await prisma.continents.create({ data });

      payload.push(value)
    }

    await Countries.countries(payload);
  }
}

module.exports = Continents;
