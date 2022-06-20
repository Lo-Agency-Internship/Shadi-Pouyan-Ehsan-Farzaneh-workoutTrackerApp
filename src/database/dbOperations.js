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
 */

function insertToExerciseCategoryTable(taskName) {
  const statement = Ldb.prepare(constants.INSERT_TO_EXERCISE_CATEGORY);
  const info = statement.run("ABS")
  const info3 = statement.run("BACK")
  const info5 = statement.run("BICEP")
  const info7 = statement.run("LEGS")
  const info9 = statement.run("CHEST")
  const info11 = statement.run("SHOULDER")
  const info13 = statement.run("REST")
}

function loadExerciseCategoryTable() {
  const statement = Ldb.prepare(constants.LOAD_EXERCISE_CATEGORY);
  const info = statement.all();
  return info;
}
// ========================  For sub exercises  ===============================
function prepareSubExerciseCategoryTable() {
  const statement = Ldb.prepare(constants.CREATE_SUB_EXERCISE_CATEGORY_TABLE);
  const info = statement.run();
}

/**
 * @param {string} subTaskName
 * @param {integer} taskId
 */

function insertToSubExerciseCategoryTable(subTaskName, taskId) {
  const statement = Ldb.prepare(constants.INSERT_TO_SUB_EXERCISE_CATEGORY);
  const info = statement.run("abs1", 1)
  const info1 = statement.run("abs2", 1)
  const info2 = statement.run("back1", 2)
  const info3 = statement.run("back2", 2)
  const info4 = statement.run("bicep1", 3)
  const info5 = statement.run("bicep2" , 3)
  const info6 = statement.run("leg1", 4)
  const info7 = statement.run("leg2", 4)
  const info8 = statement.run("chest1", 5)
  const info9 = statement.run("chest2", 5)
  const info10 = statement.run("shoulder1", 6)
  const info11 = statement.run("shoulder2", 6)
  const info12 = statement.run("rest1", 7)
  const info13 = statement.run("rest2", 7)
}
function insertNewToSubExerciseCategoryTable(subTaskName, taskId) {
  const statement = Ldb.prepare(constants.INSERT_TO_SUB_EXERCISE_CATEGORY);
  const info = statement.run(subTaskName, taskId)
}

function loadSubExerciseCategoryTable() {
  const statement = Ldb.prepare(constants.LOAD_SUB_EXERCISE_CATEGORY);
  const info = statement.all();
  return info;
}


// ========================For user exercises =====================================
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
  prepareSubExerciseCategoryTable,
  insertToSubExerciseCategoryTable,
  loadSubExerciseCategoryTable,
  insertNewToSubExerciseCategoryTable
};
