const router = require("express").Router();
const AuthController = require("../app/controllers/auth.controller");

router.post("/", AuthController.login);

module.exports = router;
