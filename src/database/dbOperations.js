const constants = require("./constants");
const {
  Ldb
} = require("./initialDataBase");
Ldb
// ========================Functions===============================
// ========================For Users===============================

function prepareUser() {
  Ldb.prepare(constants.CREATE_USER).run();
}

function insertUser(name, email, hash, salt) {
  Ldb.prepare(constants.INSERT_USER).run(name, email, hash, salt);
}

function findUserByEmail(email) {
  const user = Ldb.prepare(constants.SELECT_USER).get(email);
  return user;
}

function selectAllUsers() {
  const users = Ldb.prepare(constants.SELECT_ALL_USERS).all();
  return users;
}

// ========================For exercise categories===============================
function prepareExerciseCategoryTable() {
  Ldb.prepare(constants.CREATE_EXERCISE_CATEGORY_TABLE).run();
}

function insertToExerciseCategoryTableDefault(taskName) {
  const statement = Ldb.prepare(constants.INSERT_TO_EXERCISE_CATEGORY);
  statement.run("ABS");
  statement.run("BACK");
  statement.run("BICEP");
  statement.run("LEGS");
  statement.run("CHEST");
  statement.run("SHOULDER");
  statement.run("REST");
}

function loadExerciseCategoryTableCheck(check) {
  const info = Ldb.prepare(constants.LOAD_EXERCISE_CATEGORY_CHECK).all(check);
  if (info.length > 0) {
    return true;
  } else {
    return false;
  }
}

function loadExerciseCategoryTable() {
  const info = Ldb.prepare(constants.LOAD_EXERCISE_CATEGORY).all();
  return info;
}

// ========================  For sub exercises  ===============================
function prepareSubExerciseCategoryTable() {
  Ldb.prepare(constants.CREATE_SUB_EXERCISE_CATEGORY_TABLE).run();
}

function insertToSubExerciseCategoryTableDefault(subTaskName, taskId) {
  const statement = Ldb.prepare(constants.INSERT_TO_SUB_EXERCISE_CATEGORY);
  statement.run("abs1", 1);
  statement.run("abs2", 1);
  statement.run("back1", 2);
  statement.run("back2", 2);
  statement.run("bicep1", 3);
  statement.run("bicep2", 3);
  statement.run("leg1", 4);
  statement.run("leg2", 4);
  statement.run("chest1", 5);
  statement.run("chest2", 5);
  statement.run("shoulder1", 6);
  statement.run("shoulder2", 6);
  statement.run("rest1", 7);
  statement.run("rest2", 7);
}

function insertNewToSubExerciseCategoryTable(subTaskName, taskId) {
  Ldb.prepare(constants.INSERT_TO_SUB_EXERCISE_CATEGORY).run(
    subTaskName,
    taskId
  );
}

function loadSubExerciseCategoryTable() {
  const info = Ldb.prepare(constants.LOAD_SUB_EXERCISE_CATEGORY).all();
  return info;
}

function loadSubExerciseCategoryTableCheck(check) {
  const info = Ldb.prepare(constants.LOAD_SUB_EXERCISE_CATEGORY_CHECK).all(
    check
  );
  if (info.length > 0) {
    return true;
  } else {
    return false;
  }
}

// ========================For user exercises =====================================
function prepareUserExerciseTable() {
  Ldb.prepare(constants.CREATE_USER_EXERCISE_TABLE).run();
}

function insertToUserExerciseTable(
  taskName,
  subTaskName,
  roundRange,
  timeRange,
  description,
  exerciseDate,
  userId
) {
  Ldb.prepare(constants.INSERT_TO_USER_EXERCISE).run(
    taskName,
    subTaskName,
    roundRange,
    timeRange,
    description,
    exerciseDate,
    userId
  );
}

function loadUserExerciseTable(userId) {
  const info = Ldb.prepare(constants.LOAD_USER_EXERCISE).all(userId);
  return info;
}

function deleteFromUserExerciseTable(id) {
  Ldb.prepare(constants.DELETE_USER_EXERCISE).run(id);
}

module.exports = {
  prepareUser,
  insertUser,
  findUserByEmail,
  selectAllUsers,
  prepareUserExerciseTable,
  insertToUserExerciseTable,
  loadUserExerciseTable,
  deleteFromUserExerciseTable,
  prepareExerciseCategoryTable,
  insertToExerciseCategoryTableDefault,
  loadExerciseCategoryTable,
  prepareSubExerciseCategoryTable,
  loadSubExerciseCategoryTable,
  insertNewToSubExerciseCategoryTable,
  insertToSubExerciseCategoryTableDefault,
  loadExerciseCategoryTableCheck,
  loadSubExerciseCategoryTableCheck,
};