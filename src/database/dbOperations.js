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
// ========================For exercise===============================
function prepareTable() {
  const statement = Ldb.prepare(constants.CREATE_SAMPLE_TABLE);
  const info = statement.run();
}

/**
 * @param {string} taskName
 * @param {string} subTaskName
 * @param {string} roundRange
 * @param {string} timeRange
 * @param {string} description
 */

function insert(taskName, subTaskName, roundRange, timeRange, description, userId) {
  const statement = Ldb.prepare(constants.INSERT_NEW_SAMPLE);
  const info = statement.run(
    taskName,
    subTaskName,
    roundRange,
    timeRange,
    description,
    userId
  )
}

function testInsertYesterday(taskName, subTaskName, roundRange, timeRange, description, date) {
  const statement = Ldb.prepare(constants.TEST_INSERT_YESTERDAY);
  const info = statement.run(
    taskName,
    subTaskName,
    roundRange,
    timeRange,
    description,
    date
  )
}

function loadDataBase(userId) {
  const statement = Ldb.prepare(constants.LOAD_DATABASE);
  const info = statement.all(userId);
  return info;
}

function deleteExercise(id) {
  const statement = Ldb.prepare(constants.DELETE_EXERCISE);
  const info = statement.run(id);
}

module.exports = {
  prepareUser,
  insertUser,
  findUser,
  selectUser,
  prepareTable,
  insert,
  loadDataBase,
  deleteExercise,
  testInsertYesterday
};
