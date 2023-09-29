const express = require("express");
const router = express.Router();
const db = require("../db/index");
const ensureLoggedIn = require("../middlewares/ensure_logged_in");

router.get("/new", ensureLoggedIn, (req, res) => {
  res.render("new_form");
});

router.post("/", ensureLoggedIn, (req, res) => {
  let title = req.body.title;
  let imageUrl = req.body.image_url;
  let ingredients = req.body.ingredients;
  let instructions = req.body.instructions;
  let cookTime = req.body.cook_time;
  let serves = req.body.serves;

  const sql = `
  INSERT INTO recipes (title, image_url, ingredients, instructions, cook_time, serves, user_id) 
  VALUES ($1, $2, $3, $4, $5, $6, $7);
`;

  db.query(
    sql,
    [
      title,
      imageUrl,
      ingredients,
      instructions,
      cookTime,
      serves,
      req.session.userId,
    ],
    (err, dbRes) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    }
  );
});
//     |
router.delete("/:id", ensureLoggedIn, (req, res) => {
  const sql = `DELETE FROM recipes WHERE id = ${req.params.id};`;

  db.query(sql, (err, dbRes) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/"); // get '/
  });
});
//     |
router.get("/:id", (req, res) => {
  const sql = `SELECT * FROM recipes WHERE id = $1`;
  const values = [req.params.id];

  db.query(sql, values, (err, dbRes) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    let recipe = dbRes.rows[0];

    // Fetching the four newest recipes, excluding the current recipe
    const recommendedSql = `SELECT * FROM recipes WHERE id <> $1 ORDER BY id DESC LIMIT 4`;
    const recommendedValues = [req.params.id];

    db.query(recommendedSql, recommendedValues, (err, recommendedRes) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
      }

      let recommendedRecipes = recommendedRes.rows;

      res.render("recipe_details", { recipe, recommendedRecipes });
    });
  });
});

router.get("/:id/edit", ensureLoggedIn, (req, res) => {
  let recipeId = req.params.id;
  let sql = `SELECT * FROM recipes WHERE id = $1;`;

  db.query(sql, [recipeId], (err, dbRes) => {
    if (err) {
      console.log(err);
    }

    let recipe = dbRes.rows[0];
    res.render("edit_form", { recipe });
  });
});

router.put("/:id", ensureLoggedIn, (req, res) => {
  let title = req.body.title;
  let imageUrl = req.body.image_url;
  let ingredients = req.body.ingredients;
  let instructions = req.body.instructions;
  let cookTime = req.body.cook_time;
  let serves = req.body.serves;
  let recipeId = req.params.id;

  const sql = `
    UPDATE recipes
    SET title = $1, image_url = $2, ingredients = $3, instructions = $4, cook_time = $5, serves = $6
    WHERE id = $7;
  `;

  db.query(
    sql,
    [title, imageUrl, ingredients, instructions, cookTime, serves, recipeId],
    (err, dbRes) => {
      if (err) {
        console.log(err);
      }
      res.redirect(`/recipes/${recipeId}`);
    }
  );
});

module.exports = router;
