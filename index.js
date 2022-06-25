const express = require("express");

const path = require("path");

const crypto = require("crypto");

const axios = require("axios").default;

const fs = require("fs");

const Hashing = require("./utils.js");

// =======================================================
// Database
// =======================================================

const {
  Ldb
} = require("./src/database/initialDataBase");
Ldb;

// =======================================================

const {
  prepareUser,
  insertUser,
  findUserByEmail,
  selectAllUsers,
  prepareUserExerciseTable,
  insertToUserExerciseTable,
  deleteFromUserExerciseTable,
  loadUserExerciseTable,
  loadExerciseCategoryTable,
  prepareExerciseCategoryTable,
  prepareSubExerciseCategoryTable,
  loadSubExerciseCategoryTable,
  insertNewToSubExerciseCategoryTable,
  insertToExerciseCategoryTableDefault,
  insertToSubExerciseCategoryTableDefault,
  loadExerciseCategoryTableCheck,
  loadSubExerciseCategoryTableCheck,
} = require("./src/database/dbOperations");

prepareUser();

prepareUserExerciseTable();

prepareExerciseCategoryTable();

prepareSubExerciseCategoryTable();

if (!loadExerciseCategoryTableCheck("ABS")) {
  insertToExerciseCategoryTableDefault();
}
if (!loadSubExerciseCategoryTableCheck("abs1")) {
  insertToSubExerciseCategoryTableDefault();
}


// =======================================================

const app = express();

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

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
  res.render("register")

});


app.post("/", (req, res) => {
  const data = req.body;
  if (data.password === data.repeatPassword) {
    const user = findUserByEmail(data.email);
    if (user === undefined) {
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .pbkdf2Sync(data.password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
      insertUser(data.name, data.email, hash, salt);
      res.redirect("/login")
    } else {
      res.status(400).json({
        error: "User Already Exists"
      })
    }
  } else {
    res.status(401).json({
      error: "Password is not match"
    })
  }
});
app.get("/login", (req, res) => {

  res.render("login")
});

app.post("/login", (req, res) => {
  const data = req.body;
  const user = findUserByEmail(data.email);
  if (user === undefined) {

    res.setHeader("errorMessage", "Email is not exist").end();

  } else {
    const userId = user.id;
    const salt = user.salt;
    const hash = crypto.pbkdf2Sync(data.password, salt, 1000, 64, `sha512`).toString(`hex`);
    if (hash === user.hash) {
      const id = user.id;
      const Hash = crypto.createHash("sha256").digest("hex");
      Hashing.setHashId(id, Hash);
      res.cookie('Hash', `${Hash}`)
      res.redirect("/homepage");
    } else {
      res.setHeader("errorMessage", "Password is not match").end();

    }
  }

});

// =================================================================
// load add page
// =================================================================

app.get("/add", (req, res) => {
  const path = "./src/database/database.db";
  try {
    if (fs.existsSync(path)) {

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

// =================================================================
// add user Exercises
// =================================================================

app.post("/add/api", (req, res) => {
  const excercise = req.body.taskName;
  const subExcercise = req.body.subTaskName;
  const roundRange = req.body.roundRange;
  const timeRange = req.body.timeRange;
  const description = req.body.description;
  const exerciseDate = req.body.exerciseDate;
  const userIdHash = Hashing.HashCookie(req.headers.cookie);
  const idhash = Hashing.getHashId(userIdHash);
  const userId = idhash.id



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

// =================================================================
// add sub Exercises
// =================================================================

app.post("/add/sub/api", (req, res) => {
  const taskId = req.body.taskId;
  const newSubTask = req.body.newSubTask;
  insertNewToSubExerciseCategoryTable(newSubTask, taskId);

  const exercises = loadExerciseCategoryTable();
  const subExercises = loadSubExerciseCategoryTable();
  res.redirect("../add");
});

// =================================================================
// load homepage
// =================================================================

app.get("/homepage", (req, res) => {
  const userIdHash = Hashing.HashCookie(req.headers.cookie);
  const idhash = Hashing.getHashId(userIdHash);

  const path = "./src/database/database.db";
  let exercises;
  try {
    if (fs.existsSync(path)) {
      const userId = idhash.id;
      exercises = loadUserExerciseTable(userId);
      res.render("./homepage", {
        exercises: JSON.stringify(exercises),
      });
    }
  } catch (err) {
    res.render("information");
  }
});

// =================================================================
// delete exercise from homepage
// =================================================================

app.post("/homepage/delete", (req, res) => {
  const exercise = req.body;
  deleteFromUserExerciseTable(exercise.exerciseID);
  res.redirect("/homepage");
});

// =================================================================
// end point to send to others
// =================================================================

app.get("/api/ourgym", (req, res) => {
  const allUsers = selectAllUsers();

  const sendToOthers = [];

  allUsers.filter((item) => {
    let userExercises = loadUserExerciseTable(item.id);

    userExercises.filter((item2) => {
      sendToOthers.push({
        personName: item.name,
        exerciseName: item2.taskName,
        subExerciseName: item2.subTaskName,
        NumberOfRounds: item2.roundRange,
        TimeOfEachRound: item2.timeRange,
        DateOfExercise: item2.date,
      });
    });
  });

  res.json(sendToOthers);
});

// =================================================================
// end point to receive from others
// =================================================================
app.get("/othergyms", (req, res) => {
  res.render("./othergyms");
});

app.get("/othergym1", (req, res) => {
  axios.get("https://be52-86-107-55-254.sa.ngrok.io/api/trainings")
    .then(response => {
      let exercises = response.data;
      res.render("./othergym1", {
        exercises: JSON.stringify(exercises),
      });
    })
});

app.get("/othergym2", (req, res) => {
  axios.get("https://7ea8-31-56-95-233.eu.ngrok.io/api")
    .then(response => {
      let exercises = response.data;
      res.render("./othergym2", {
        exercises: JSON.stringify(exercises),
      });
    })
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