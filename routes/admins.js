"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    const adminID = req.params.id;
    knex('poll')
      .join('options', 'poll.id', 'options.pollid')
      .where('adminurl',adminID)
      .join('votes', 'options.id', 'votes.optionid')
      // .join('voters', 'votes.optionid', '=', 'voters.id')
      .select('polldescription', 'title', 'description', 'adminurl', 'optionid', 'points')
      // , function() {
      //   this.sum('points as total').groupBy('title');
      // }
      .then((results) => {
        let templateVars = {votes: results};
        // if (templateVars === {}) {
        //   res.send({ error: 'this poll has not received any votes yet' });
        // } else
        res.render("admin", templateVars);
    });
  });
  return router;
};

//.sum('points as total').groupBy('title')
