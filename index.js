const express = require("express");

const path = require("path");

const { parse } = require("path");

const crypto = require("crypto");

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
  prepareUser,
  insertUser,
  findUser,
  selectUser,
  prepareUserExerciseTable,
  insertToUserExerciseTable,
  deleteFromUserExerciseTable,
  loadUserExerciseTable,
  loadExerciseCategoryTable,
  prepareExerciseCategoryTable,
  insertToExerciseCategoryTable,
  prepareSubExerciseCategoryTable,
  loadSubExerciseCategoryTable,
  insertToSubExerciseCategoryTable,
  insertNewToSubExerciseCategoryTable,
} = require("./src/database/dbOperations");

prepareExerciseCategoryTable();

insertToExerciseCategoryTable();

prepareSubExerciseCategoryTable();

insertToSubExerciseCategoryTable();

// =======================================================

const { request } = require("http");

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
// create user
// =================================================================

// serving the / route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/pages" + "/register.html");
});

app.post("/", (req, res) => {
  const data = req.body;
  if (data.password === data.repeatPassword) {
    prepareUser();
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(data.password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
    // inserting the user into user table
    insertUser(data.name, data.email, hash, salt);
    res.sendFile("./src/pages/login.html", { root: __dirname });
    // res.redirect('./login.html')
    // if (user != undefined) {
    //     console.log('user')
    //     const statement = db.prepare(`INSERT INTO user(name, email, password) VALUES(?,?,?)`)

    //     statement.run(user.name, user.emali, user.password);
    // }
    // else {
    //     console.log('getting undefined data');
    //     return res.send('undefined data')
    // }
  }
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/src/pages" + "/login.html");
});

app.post("/login", (req, res) => {
  const data = req.body;
  // if (data.email && data.password) {
  //   selectUser(data.email);
  // }
  const user = findUser(data.email);
  const userId = user.id;
  res.cookie("user-id", userId);
  res.redirect("/homepage");
});

// =================================================================
// add exercise
// =================================================================

app.get("/add", (req, res) => {
  const path = "./src/database/database.db";
  try {
    if (fs.existsSync(path)) {
      // const userId = idCookie;

      const exercises = loadExerciseCategoryTable();

      const subExercises = loadSubExerciseCategoryTable();

      res.render("./add", {
        exercises,
        subExercises,
      });
    }

  } catch (err) {
    res.render("information");
  }
});

// =================================

app.post("/add/api", (req, res) => {

  const excercise = req.body.taskName
  const subExcercise = req.body.subTaskName
  const roundRange = req.body.roundRange;
  const timeRange = req.body.timeRange;
  const description = req.body.description;
  const exerciseDate = req.body.exerciseDate;
  const userId = req.headers.cookie.split("=")[1];

  prepareUserExerciseTable();

  insertToUserExerciseTable(
    excercise,
    subExcercise,
    roundRange,
    timeRange,
    description,
    exerciseDate,
    userId
  );
});

app.post("/add/sub/api", (req, res) => {
  const taskId = req.body.taskId;
  const newSubTask = req.body.newSubTask;
  insertNewToSubExerciseCategoryTable(newSubTask, taskId);

  const exercises = loadExerciseCategoryTable();
  const subExercises = loadSubExerciseCategoryTable();
  res.redirect("http://localhost:3000/add");
});

// =================================================================
// homepage
// =================================================================

app.get("/homepage", (req, res) => {
  const idCookie = req.headers.cookie.split("=")[1];
  const path = "./src/database/database.db";
  let exercises
  try {
    if (fs.existsSync(path)) {
      const userId = idCookie;
      exercises = loadUserExerciseTable(userId);
      res.render("./homepage", {
        exercises: JSON.stringify(exercises)
      });
    }
  } catch (err) {
    res.render("information");
  }
});

app.post("/homepage/filtered", (req, res) => {
  let exercises = req.body
  console.log("exercisesssssssssss", exercises)
  res.render("./homepageFiltered", {
    exercises: JSON.stringify(exercises)
  });
}
)
// =================================
// =================================

app.post("/homepage/delete", (req, res) => {
  const exercise = req.body;
  console.log("delette filter");
  console.log(req.body);
  deleteFromUserExerciseTable(exercise.exerciseID);
  res.redirect("/homepage");
});

// =================================
// =================================

app.post("/homepage/filterdays", (req, res) => {

  const userId = req.body;
  const allExercises = loadUserExerciseTable(userId);

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
  res.send({ exercises: exercises });

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
