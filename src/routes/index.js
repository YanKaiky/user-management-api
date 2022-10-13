const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const auth = require("./auth");
const cities = require("./cities");
const continents = require("./continents");
const countries = require("./countries");
const dashboard = require("./dashboard");
const states = require("./states");
const users = require("./users");

router.get("/", (_, response) => response.status(200).json({ message: `© ${new Date().getUTCFullYear()}, User Management` }));

router.use("/login", auth);

router.use("/cities", cities);

router.use("/continents", continents);

router.use("/countries", countries);

router.use("/dashboard", dashboard);

router.use("/states", states);

router.use("/users", users);

router.use(async (_, __, message) => message(createError.NotFound("Route not found")));

router.use((error, _, response, __) => response.status(error.status || 500).json({ message: error.message }));

module.exports = router;
