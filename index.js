const express = require("express");

const path = require("path");

const { parse } = require("path");

const { load, save } = require("./utils");

const axios = require("axios").default;

const fs = require("fs");

// =======================================================
// Database
// =======================================================

const Database = require("better-sqlite3");

const { initializedDB, Ldb } = require("./src/database/initialDataBase");
initializedDB();

// =======================================================

const {
  prepareDB,
  insert,
  deleteExercise,
  loadDataBase,
} = require("./src/database/dbOperations");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "src", "public")));

const port = 3000;

app.set("view engine", "twig");
app.set("views", path.join(__dirname, "src", "pages"));

// =================================================================
// routes
// =================================================================

// =================================================================
// add exercise
// =================================================================

app.get("/add", (req, res) => {
  res.render("add.twig");
});

// =================================

app.post("/add/api", (req, res) => {
  const excercise = req.body.excerciseName.split(",")[0];
  const subExcercise = req.body.excerciseName.split(",")[1];
  const roundRange = req.body.roundRange;
  const timeRange = req.body.timeRange;
  const description = req.body.description;

  prepareDB();

  insert(excercise, subExcercise, roundRange, timeRange, description);
});

// =================================================================
// homepage
// =================================================================

app.get("/homepage", (req, res) => {
  const path = "./src/database/database.db";
  try {
    if (fs.existsSync(path)) {
      const exercises = loadDataBase();
      res.render("./homepage", {
        exercises,
      });
    }
  } catch (err) {
    res.render("information");
  }
});

// =================================

app.post("/homepage/delete", (req, res) => {
  const exercise = req.body;
  deleteExercise(exercise.exerciseID);
  res.redirect("/homepage");
});

// =================================================================
// listen port
// =================================================================

app.listen(port, () => {
  console.log(
    `The server is running succesfully on the http://localhost:${port}.`
  );
});
