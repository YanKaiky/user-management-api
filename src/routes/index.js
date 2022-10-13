const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const auth = require("./auth");
const dashboard = require("./dashboard");
const users = require("./users");
const cities = require("./cities");

router.get("/", (_, response) => response.status(200).json({ message: `© ${new Date().getUTCFullYear()}, User Management` }));

router.use("/login", auth);

router.use("/dashboard", dashboard);

router.use("/users", users);

router.use("/cities", cities);

router.use(async (_, __, message) => message(createError.NotFound("Route not found")));

router.use((error, _, response, __) => response.status(error.status || 500).json({ message: error.message }));

module.exports = router;
