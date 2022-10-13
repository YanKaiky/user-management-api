const express = require("express");
const CountriesController = require("../app/controllers/countries.controller");
const auth = require("../app/middlewares/auth.middlewares");

const router = express.Router();

router.post("/", auth, CountriesController.createCountry);

router.get("/", auth, CountriesController.getAllCountries);

router.get("/:guid", auth, CountriesController.getCountryByGuid);

router.put("/:guid", auth, CountriesController.updateCountry);

router.delete("/:guid", auth, CountriesController.deleteCountry);

module.exports = router;
