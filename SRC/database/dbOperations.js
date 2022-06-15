const constants = require("./constants");
const { Ldb } = require("./initialDataBase");
// ========================Functions===============================

function prepareDB() {
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

function insert(taskName, subTaskName, roundRange, timeRange, description) {
  const statement = Ldb.prepare(constants.INSERT_NEW_SAMPLE);
  const info = statement.run(
    taskName,
    subTaskName,
    roundRange,
    timeRange,
    description
  )
}

function loadDataBase() {
  const statement = Ldb.prepare(constants.LOAD_DATABASE);
  const info = statement.all();
  return info;
}

function deleteExercise(id) {
  const statement = Ldb.prepare(constants.DELETE_EXERCISE);
  const info = statement.run(id);
}

module.exports = {
  prepareDB,
  insert,
  loadDataBase,
  deleteExercise,
};
