const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
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

  const people = [
    {
      name: 'Yan Kaiky',
      last_name: 'Augusto dos Santos',
      email: 'yankaikys@gmail.com',
      cpf: '13424551937',
      birth_date: new Date('2002-12-22T23:15'),
    },
    {
      name: 'Miles',
      last_name: 'Morales',
      email: 'miles@gmail.com',
      cpf: '57520593053',
      birth_date: new Date('2000-12-22T00:00'),
    },
    {
      name: 'Gwen',
      last_name: 'Stacy',
      email: 'gwen@gmail.com',
      cpf: '26965804050',
      birth_date: new Date('2001-11-21T00:00'),
    },
    {
      name: 'Peter',
      last_name: 'Park',
      email: 'peter@gmail.com',
      cpf: '08197375003',
      birth_date: new Date('2002-11-12T00:00'),
    },
  ]

  const city = await prisma.cities.findFirst({
    where: {
      name: 'Blumenau'
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

seed();
