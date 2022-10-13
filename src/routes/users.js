const express = require("express");
const UsersController = require("../app/controllers/users.controller");
const auth = require("../app/middlewares/auth.middlewares");

const router = express.Router();

router.post("/", auth, UsersController.createUser);

router.get("/", auth, UsersController.getAllUsers);

router.get("/:guid", auth, UsersController.getUserByGuid);

router.put("/:guid", auth, UsersController.updateUser);

router.delete("/:guid", auth, UsersController.deleteUser);

module.exports = router;
