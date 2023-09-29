require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const requestLogger = require("./middlewares/request_logger");
const reqBodyMethodOverride = require("./middlewares/request_override");
const session = require("express-session");
const setCurrentUser = require("./middlewares/set_current_user");
const recipesRouter = require("./routes/recipes_routes");
const sessionsRouter = require("./routes/sessions_routes");
const pageRouter = require("./routes/pages_routes");
const userRouter = require("./routes/user_routes");
// const ensureLoggedIn = require("../middlewares/ensure_logged_in");

const app = express();
const port = process.env.PORT || 8888;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(reqBodyMethodOverride);
// enable session as an object in req so we can write key values in it
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mistyrose",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(setCurrentUser);
app.use(requestLogger);
app.use(expressLayouts);

// ==========================================
// ============      Routes      ============
// ==========================================

app.use("/", pageRouter);
app.get("/new", (req, res) => {
  res.render("new_form");
});
// app.use(ensureLoggedIn);
app.use("/recipes", recipesRouter);
app.use("/", userRouter);
app.use("/", sessionsRouter);
app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
