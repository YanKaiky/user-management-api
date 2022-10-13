const express = require("express");
const StatesController = require("../app/controllers/states.controller");
const auth = require("../app/middlewares/auth.middlewares");

const router = express.Router();

router.post("/", auth, StatesController.createState);

router.get("/", auth, StatesController.getAllStates);

router.get("/:guid", auth, StatesController.getStateByGuid);

router.put("/:guid", auth, StatesController.updateState);

router.delete("/:guid", auth, StatesController.deleteState);

module.exports = router;
