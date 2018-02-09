"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });
  
  // Admin page
  app.get("/admins/:id", (req, res) => {
    res.render("admin");
  });

 
 
  return router;
}