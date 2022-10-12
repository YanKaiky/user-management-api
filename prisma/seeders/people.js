const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

class People {
    static people = async () => {
        const people = [
            {
                name: 'Yan Kaiky',
                last_name: 'Augusto dos Santos',
                password: bcrypt.hashSync('yankaikys', 8),
                email: 'yankaikys@gmail.com',
                cpf: '13424551937',
                birth_date: new Date('2002-12-22T23:15'),
            },
            {
                name: 'Miles',
                last_name: 'Morales',
                password: bcrypt.hashSync('miles', 8),
                email: 'miles@gmail.com',
                cpf: '57520593053',
                birth_date: new Date('2000-12-22T00:00'),
            },
            {
                name: 'Gwen',
                last_name: 'Stacy',
                password: bcrypt.hashSync('gwen', 8),
                email: 'gwen@gmail.com',
                cpf: '26965804050',
                birth_date: new Date('2001-11-21T00:00'),
            },
            {
                name: 'Peter',
                last_name: 'Park',
                password: bcrypt.hashSync('peter', 8),
                email: 'peter@gmail.com',
                cpf: '08197375003',
                birth_date: new Date('2002-11-12T00:00'),
            },
        ]

        const city = await prisma.cities.findFirst({
            where: {
                name: 'Los Angeles'
            }
        })

        for (const person of people) {
            await prisma.peoples.create({
                data: {
                    ...person,
                    city_guid: city.guid,
                }
            })
        };
    }
}

module.exports = People;
