const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const people = require("./people");

router.get("/", (_, response) => response.status(200).json({ message: `© ${new Date().getUTCFullYear()}, User Management` }));

router.use("/people", people);

router.use(async (_, __, message) => message(createError.NotFound("ROUTE_NOT_FOUND")));

router.use((error, _, response, __) => response.status(error.status || 500).json({ message: error.message }));

module.exports = router;
