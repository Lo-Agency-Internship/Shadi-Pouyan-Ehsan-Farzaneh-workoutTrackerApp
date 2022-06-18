module.exports = {
  Create_user: `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(50) NOT NULL, 
    email varchar(50) NOT NULL, 
    password varchar(50) NOT NULL
    )`,

  Insert_user: `INSERT INTO users( 
    name, 
    email, 
    password
    ) VALUES 
    (?,?,?)`,

  Select_user: `SELECT * FROM users`,
  Find_user: `SELECT * FROM users WHERE id = ?`,



  CREATE_SAMPLE_TABLE: `CREATE TABLE IF NOT EXISTS excercises(
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    taskName text,
    subTaskName text,
    roundRange text,
    timeRange text,
    description text,
    date text,
    FOREIGN KEY(user) REFERENCES users(id)
    )`,
  INSERT_NEW_SAMPLE: `INSERT INTO excercises (
    taskName,
    subTaskName,
    roundRange,
    timeRange,
    description,
    date,
    user)
    VALUES(?,?,?,?,?,CURRENT_DATE,?)`,
  LOAD_DATABASE: `SELECT * FROM excercises`,
  DELETE_EXERCISE: `DELETE FROM excercises WHERE id=?`,
  TEST_INSERT_YESTERDAY: `INSERT INTO excercises (
    taskName,
    subTaskName,
    roundRange,
    timeRange,
    description,
    date)
    VALUES(?,?,?,?,?,?)`
};
