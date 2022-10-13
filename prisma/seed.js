const Continents = require("./seeders/continents");

async function seed() {
  await Continents.continents();
}

seed();
