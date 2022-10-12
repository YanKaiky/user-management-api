const express = require("express");
const DashboardController = require("../app/controllers/dashboard.controller");
const auth = require("../app/middlewares/auth.middlewares");

const router = express.Router();

router.get("/", auth, DashboardController.getValues);

module.exports = router;
