const express = require("express");
const ContinentsController = require("../app/controllers/continents.controller");
const auth = require("../app/middlewares/auth.middlewares");

const router = express.Router();

router.post("/", auth, ContinentsController.createContinent);

router.get("/", auth, ContinentsController.getAllContinents);

router.get("/:guid", auth, ContinentsController.getContinentByGuid);

router.put("/:guid", auth, ContinentsController.updateContinent);

router.delete("/:guid", auth, ContinentsController.deleteContinent);

module.exports = router;
