const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {
  // receives email & password from the user
  // does this user even exists?

  sql = `
      SELECT * FROM users WHERE email = $1;
    `;
  values = [req.body.email];

  db.query(sql, values, (err, dbRes) => {
    if (err) {
      console.log(err);
    }

    if (dbRes.rows.length === 0) {
      return res.send("incorrect email or password");
    }

    // its time to check your password

    // password from the user form submission - req.body.password
    // hashed / digested password in the database - dbRes.rows[0].password_digest

    const userInputPassword = req.body.password;
    const hashedPasswordFromDb = dbRes.rows[0].password_digest;

    bcrypt.compare(userInputPassword, hashedPasswordFromDb, (err, result) => {
      if (result) {
        req.session.userId = dbRes.rows[0].id;
        return res.redirect("/");
      } else {
        return res.send("incorrect email or password");
      }
    });
  });
});
router.delete("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect("/login");
});

module.exports = router;
