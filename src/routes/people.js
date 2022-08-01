const express = require("express");
const PeopleController = require("../app/controllers/people.controller");

const router = express.Router();

router.post("/", PeopleController.createPeople);

router.get("/", PeopleController.getAllPeople);

router.get("/:guid", PeopleController.getPeopleByGuid);

router.put("/:guid", PeopleController.updatePeople);

router.delete("/:guid", PeopleController.deletePeople);

module.exports = router;
