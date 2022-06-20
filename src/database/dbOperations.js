const constants = require("./constants");
const { Ldb } = require("./initialDataBase");
// ========================Functions===============================
// ========================For Users===============================

function prepareUser() {
  const statement = Ldb.prepare(constants.Create_user);
  const info = statement.run();
}
function insertUser(name, email, hash, salt) {
  const statement = Ldb.prepare(constants.Insert_user);
  const info = statement.run(name, email, hash, salt)
}
function findUser(email) {
  const statement = Ldb.prepare(constants.Find_user);
  const user = statement.get(email);
  return user;
}
function selectUser() {
  const statement = Ldb.prepare(constants.Select_user);
  const users = statement.all()
  return users
}
// ========================For exercise categories===============================
function prepareExerciseCategoryTable() {
  const statement = Ldb.prepare(constants.CREATE_EXERCISE_CATEGORY_TABLE);
  const info = statement.run();
}

/**
 * @param {string} taskName
 * @param {string} subTaskName
 */

function insertToExerciseCategoryTable(taskName, subTaskName) {
  const statement = Ldb.prepare(constants.INSERT_TO_EXERCISE_CATEGORY);
  const info = statement.run("ABS","abs1")
  const info2 = statement.run("ABS","abs2")
  const info3 = statement.run("BACK","back1")
  const info4 = statement.run("BACK","back2")
  const info5 = statement.run("BICEP","bicep1")
  const info6 = statement.run("BICEP","bicep2")
  const info7 = statement.run("LEGS","legs1")
  const info8 = statement.run("LEGS","legs2")
  const info9 = statement.run("CHEST","chest1")
  const info10 = statement.run("CHEST","chest2")
  const info11 = statement.run("SHOULDER","shoulder1")
  const info12 = statement.run("SHOULDER","shoulder2")
  const info13 = statement.run("REST","sleep")
  const info14 = statement.run("REST","medidate")
}


function loadExerciseCategoryTable() {
  const statement = Ldb.prepare(constants.LOAD_EXERCISE_CATEGORY);
  const info = statement.all();
  return info;
}

function deleteFromExerciseCategoryTable(id) {
  const statement = Ldb.prepare(constants.DELETE_USER_EXERCISE);
  const info = statement.run(id);
}

// ========================For user exercise=====================================
function prepareUserExerciseTable() {
  const statement = Ldb.prepare(constants.CREATE_USER_EXERCISE_TABLE);
  const info = statement.run();
}

/**
 * @param {string} taskName
 * @param {string} subTaskName
 * @param {string} roundRange
 * @param {string} timeRange
 * @param {string} description
 */

function insertToUserExerciseTable(taskName, subTaskName, roundRange, timeRange, description, exerciseDate, userId) {
  const statement = Ldb.prepare(constants.INSERT_TO_USER_EXERCISE);
  const info = statement.run(
    taskName,
    subTaskName,
    roundRange,
    timeRange,
    description,
    exerciseDate,
    userId
  )
}

function loadUserExerciseTable(userId) {
  const statement = Ldb.prepare(constants.LOAD_USER_EXERCISE);
  const info = statement.all(userId);
  return info;
}

function deleteFromUserExerciseTable(id) {
  const statement = Ldb.prepare(constants.DELETE_USER_EXERCISE);
  const info = statement.run(id);
}

module.exports = {
  prepareUser,
  insertUser,
  findUser,
  selectUser,
  prepareUserExerciseTable,
  insertToUserExerciseTable,
  loadUserExerciseTable,
  deleteFromUserExerciseTable,
  prepareExerciseCategoryTable,
  insertToExerciseCategoryTable,
  loadExerciseCategoryTable,
  deleteFromExerciseCategoryTable
};
