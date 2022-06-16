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
  prepareTable,
  insert,
  deleteExercise,
  loadDataBase,
  testInsertYesterday,
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

  prepareTable();

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
// =================================

app.post("/homepage/delete", (req, res) => {
  const exercise = req.body;
  deleteExercise(exercise.exerciseID);
  res.redirect("/homepage");
});

// =================================
// =================================

app.post("/homepage/filterdays/:askedDay", (req, res) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var prevDay = String(Number(dd) - 1);
  var nextDay = String(Number(dd) + 1);
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = String(today.getFullYear());
  
  const yesterdayDate = [yyyy, mm, prevDay];
  const todayDate = [yyyy, mm, dd];
  const tomorrowDate = [yyyy, mm, nextDay];

  const askedDay = req.params.askedDay;
  const allExercises = loadDataBase();

  let exercises = [];

  let filteration = allExercises.filter(function (item) {
    let exerciseDate = item.date.split("-");
      switch (askedDay) {
        case "1":
          if (JSON.stringify(exerciseDate) == JSON.stringify(yesterdayDate)) {
            exercises.push(item);
          }
          break;

        case "2":
          if (JSON.stringify(exerciseDate) == JSON.stringify(todayDate)) {
            exercises.push(item);
          }
          break;

        case "3":
          if (JSON.stringify(exerciseDate) == JSON.stringify(tomorrowDate)) {
            exercises.push(item);
          }
          break;

        default:
          break;
      }
  });

  res.send({"exercises":exercises})
 
  // res.render("./homepage", {
  //   exercises
  // });
 
});


// =================================================================
// informative pages
// =================================================================

app.get("/information", (req, res) => {
  res.render("information.twig");
});

// =================================================================
// listen port
// =================================================================

app.listen(port, () => {
  console.log(
    `The server is running succesfully on the http://localhost:${port}.`
  );
});

// const excercise = "yesterday";
// const subExcercise = "yesterday";
// const roundRange = "9";
// const timeRange = "9";
// const description = "yesterday";
// const date = "2022-06-14";
// prepareTable();
// testInsertYesterday(
//   excercise,
//   subExcercise,
//   roundRange,
//   timeRange,
//   description,
//   date
// );
