const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/users", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds

    const sql = `
      INSERT INTO users (email, password_digest)
      VALUES ($1, $2)
    `;

    db.query(sql, [email, hashedPassword], (err, dbRes) => {
      if (err) {
        console.error(err);
        // Handle the error (e.g., show an error message or redirect to an error page)
      } else {
        // User registered successfully
        res.redirect("/login"); // Redirect to the login page
      }
    });
  } catch (error) {
    console.error(error);
    // Handle the error (e.g., show an error message or redirect to an error page)
  }
});

module.exports = router;
