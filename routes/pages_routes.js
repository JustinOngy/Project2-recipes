const express = require("express");
const router = express.Router();
const db = require("../db");
const ensureLoggedIn = require("../middlewares/ensure_logged_in");

router.get("/", (req, res) => {
  console.log(req.session.userId);
  db.query("SELECT * FROM recipes order by title;", (err, dbRes) => {
    if (err) {
      console.log(err);
    }
    let recipes = dbRes.rows;

    res.render("home", { recipes: recipes });
  });
});

router.get("/browse", (req, res) => {
  console.log(req.session.userId);
  db.query("SELECT * FROM recipes order by title;", (err, dbRes) => {
    if (err) {
      console.log(err);
    }
    let recipes = dbRes.rows;

    res.render("browse", { recipes: recipes });
  });
});
module.exports = router;
