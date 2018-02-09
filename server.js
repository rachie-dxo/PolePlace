import { create } from 'domain';

"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const adminRoutes = require("./routes/admins");
const createRoutes = require("./routes/create");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/admins", adminRoutes(knex));
app.use("/create", createRoutes(knex));

function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}


// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Create Poll page
app.get("/create", (req, res) => {
  res.render("create");
});

// Poll:id page
app.get("/polls/:id", (req, res) => {
  res.render("poll");
});

// Admin page
app.get("/admins/:id", (req, res) => {
  res.render("admin");
});

app.post("/polls", (req, res) => {
    let randomPollID = generateRandomString();
    let randomAdminID = generateRandomString();
    let adminEmail = ''; //email submitted from form 
    //add 
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
