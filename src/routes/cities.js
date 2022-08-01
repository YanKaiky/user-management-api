const express = require("express");
const CitiesController = require("../app/controllers/cities.controller");

const router = express.Router();

router.post("/", CitiesController.createCity);

router.get("/", CitiesController.getAllCities);

router.get("/:guid", CitiesController.getCityByGuid);

router.put("/:guid", CitiesController.updateCity);

router.delete("/:guid", CitiesController.deleteCity);

module.exports = router;
