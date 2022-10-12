const express = require("express");
const CitiesController = require("../app/controllers/cities.controller");
const auth = require("../app/middlewares/auth.middlewares");

const router = express.Router();

router.post("/", auth, CitiesController.createCity);

router.get("/", auth, CitiesController.getAllCities);

router.get("/:guid", auth, CitiesController.getCityByGuid);

router.put("/:guid", auth, CitiesController.updateCity);

router.delete("/:guid", auth, CitiesController.deleteCity);

module.exports = router;
