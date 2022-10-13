const { PrismaClient } = require('@prisma/client');
const Cities = require('./cities');
const prisma = new PrismaClient();

class States {
    static states = async (coutries) => {
        const states = [
            {
                name: 'California',
                uf: 'CA',
                country_guid: coutries[0].guid,
            },
            {
                name: 'Santa Catarina',
                uf: 'SC',
                country_guid: coutries[1].guid,
            },
            {
                name: 'New Scotia',
                uf: 'NE',
                country_guid: coutries[2].guid,
            },
            {
                name: 'Shikoku',
                uf: 'SH',
                country_guid: coutries[3].guid,
            },
            {
                name: 'Viken',
                uf: 'VK',
                country_guid: coutries[4].guid,
            },
        ];

        const payload = [];

        for (const data of states) {
            const value = await prisma.states.create({ data })

            payload.push(value)
        };

        await Cities.cities(payload);
    }
}

module.exports = States;
