const { PrismaClient } = require('@prisma/client');
const States = require('./states');
const prisma = new PrismaClient();

class Countries {
    static countries = async (continents) => {
        const countries = [
            {
                name: 'Unites States of America',
                continent_guid: continents[4].guid,
            },
            {
                name: 'Brazil',
                continent_guid: continents[6].guid,
            },
            {
                name: 'Canada',
                continent_guid: continents[4].guid,
            },
            {
                name: 'Japan',
                continent_guid: continents[1].guid,
            },
            {
                name: 'Norway',
                continent_guid: continents[3].guid,
            },
        ]

        const payload = [];

        for (const data of countries) {
            const value = await prisma.countries.create({ data })

            payload.push(value)
        };

        await States.states(payload);
    }
}

module.exports = Countries;
