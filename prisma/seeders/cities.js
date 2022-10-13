const { PrismaClient } = require('@prisma/client');
const Users = require('./users');
const prisma = new PrismaClient();

class Cities {
  static cities = async (states) => {
    const cities = [
      {
        name: 'Los Angeles',
        state_guid: states[0].guid,
      },
      {
        name: 'Blumenau',
        state_guid: states[1].guid,
      },
      {
        name: 'Halifax',
        state_guid: states[2].guid,
      },
      {
        name: 'Tokushima City',
        state_guid: states[3].guid,
      },
      {
        name: 'Hønefoss',
        state_guid: states[4].guid,
      },
    ]

    const payload = [];

    for (const data of cities) {
      const value = await prisma.cities.create({ data });

      payload.push(value)
    }

    await Users.users(payload);
  }
}

module.exports = Cities;
