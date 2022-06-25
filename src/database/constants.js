module.exports = {
  CREATE_USER: `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(50) NOT NULL, 
    email varchar(50) NOT NULL, 
    hash string,
    salt string
    )`,

  INSERT_USER: `INSERT INTO users( 
    name, 
    email, 
    hash,
    salt
    ) VALUES 
    (?,?,?,?)`,

  SELECT_ALL_USERS: `SELECT * FROM users`,
  SELECT_USER: `SELECT * FROM users WHERE email = ?`,

  // =========================
  // EXERCISE_CATEGORY_TABLE

  CREATE_EXERCISE_CATEGORY_TABLE: `CREATE TABLE IF NOT EXISTS excercises(
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    taskName text
    )`,
  INSERT_TO_EXERCISE_CATEGORY: `INSERT INTO excercises (
    taskName
  )
    VALUES(?)
          `,
  LOAD_EXERCISE_CATEGORY: `SELECT * FROM excercises`,
  LOAD_EXERCISE_CATEGORY_CHECK: `SELECT * FROM excercises WHERE taskName = ?`,

  // =============================
  // sub exercise categories table

  CREATE_SUB_EXERCISE_CATEGORY_TABLE: `CREATE TABLE IF NOT EXISTS subExcercises(
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    subTaskName text,
    taskId INTEGER,
    FOREIGN KEY(taskId) REFERENCES excercises(id)
    )`,
  INSERT_TO_SUB_EXERCISE_CATEGORY: `INSERT INTO subExcercises (
    subTaskName,
    taskId
  )
    VALUES(?,?)
          `,

  LOAD_SUB_EXERCISE_CATEGORY: `SELECT * FROM subExcercises`,
  LOAD_SUB_EXERCISE_CATEGORY_CHECK: `SELECT * FROM subExcercises WHERE subTaskName = ? `,

  DELETE_SUB_EXERCISE_CATEGORY: `DELETE FROM subExcercises WHERE taskId=?`,

  // =========================
  // USER_EXERCISE_TABLE

  CREATE_USER_EXERCISE_TABLE: `CREATE TABLE IF NOT EXISTS userExercise(
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    taskName text,
    subTaskName text,
    roundRange text,
    timeRange text,
    description text,
    date text,
    userId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id)
    )`,
  INSERT_TO_USER_EXERCISE: `INSERT INTO userExercise (
    taskName,
    subTaskName,
    roundRange,
    timeRange,
    description,
    date,
    userId
  )
    VALUES(?,?,?,?,?,?,?)`,
  LOAD_USER_EXERCISE: `SELECT * FROM userExercise WHERE userId=?`,
  DELETE_USER_EXERCISE: `DELETE FROM userExercise WHERE id=?`
};