module.exports = {
  CREATE_SAMPLE_TABLE: `CREATE TABLE IF NOT EXISTS excercises(
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    taskName text,
    subTaskName text,
    roundRange text,
    timeRange text,
    description text,
    date text
    )`,
  INSERT_NEW_SAMPLE: `INSERT INTO excercises (
    taskName,
    subTaskName,
    roundRange,
    timeRange,
    description,
    date)
    VALUES(?,?,?,?,?,CURRENT_DATE)`,
  LOAD_DATABASE: `SELECT * FROM excercises`
};
