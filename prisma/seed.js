const Cities = require('./seeders/cities');
const People = require('./seeders/people');

async function seed() {
  await Cities.cities();
  await People.people();
}

seed();
