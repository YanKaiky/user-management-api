const express = require("express");
const PeopleController = require("../app/controllers/people.controller");
const auth = require("../app/middlewares/auth.middlewares");

const router = express.Router();

router.post("/", auth, PeopleController.createPeople);

router.get("/", auth, PeopleController.getAllPeople);

router.get("/:guid", auth, PeopleController.getPeopleByGuid);

router.put("/:guid", auth, PeopleController.updatePeople);

router.delete("/:guid", auth, PeopleController.deletePeople);

module.exports = router;
