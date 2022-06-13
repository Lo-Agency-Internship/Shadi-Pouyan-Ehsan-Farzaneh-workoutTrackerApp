const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");
const constants = require("./src/database/constants")
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, "src", "public")));

const { parse } = require("path");

const port = 3000;

const { load, save } = require("./utils");

const axios = require("axios").default;

app.set("view engine", "twig");
app.set("views", path.join(__dirname, "src", "pages"));

// =======================================================
// Database
// =======================================================

const Database = require("better-sqlite3");
const db = new Database(
  "src/database/excercises.db",
  Database.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    verbose: console.log;
  }
);
function prepare() {
  const statement = db.prepare(constants.CREATE_SAMPLE_TABLE);
  const info = statement.run();
  console.log(info);
}
/**
 * @param {string} taskName
 * @param {string} subTaskName
 * @param {string} roundRange
 * @param {string} timeRange
 * @param {string} description
 */
function insert(taskName, subTaskName, roundRange, timeRange, description) {
  const statement = db.prepare(constants.INSERT_NEW_SAMPLE);
  const info = statement.run(taskName, subTaskName, roundRange, timeRange, description);
  console.log(info);
}

// function autoIncrement(id) {
  
// }
// db.aggregate('addAll', {
//   start: 0,
//   step: (total, nextValue) => total + nextValue,
// });

// db.prepare('SELECT addAll(dollars) FROM expenses').pluck().get(); // => 92


// =================================================================
// routes
// =================================================================

app.get("/add", (req, res) => {
  res.render("add.twig");
});

app.post("/add/api", (req, res) => {
  const excercise = req.body.excerciseName.split(",")[0];
  const subExcercise = req.body.excerciseName.split(",")[1];
  const roundRange = req.body.roundRange;
  const timeRange = req.body.timeRange;
  const description = req.body.description;
  

  prepare();
  insert(excercise, subExcercise, roundRange, timeRange, description);

});

// =====================================
// =====================================

app.get("/homepage", (req, res) => {
  res.render("homepage.twig");
});

// =====================================
// =====================================
app.listen(port, () => {
  console.log(
    `The server is running succesfully on the http://localhost:${port}. `
  );
});
