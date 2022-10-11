const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");

const routes = require("./src/routes");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
