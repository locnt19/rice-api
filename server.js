const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();
const http = require("http").Server(app);

const port = process.env.PORT || 3000;

const routes = require("./src/routes");

// connect to the database
require("./src/config/database");

// logger for debugging
app.use(logger("dev"));

// configure the body parser for AJAX requests
app.use(express.json());

// enable nested object request body
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// enable cross-site HTTP requests
app.use(cors());

// public static file
app.use(
  process.env.PUBLIC_STATIC_FILE,
  express.static(path.join(__dirname, process.env.PUBLIC_STATIC_FILE))
);

// configure routes
app.use(routes);

// remove it when applying boilerplate to your project
app.get("/", (req, res) => {
  res.json("Hello world from awesome project");
});

// server initialization
const server = http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
