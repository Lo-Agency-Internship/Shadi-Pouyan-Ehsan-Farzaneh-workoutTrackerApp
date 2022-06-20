module.exports = {
  Create_user: `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(50) NOT NULL, 
    email varchar(50) NOT NULL, 
    hash string,
    salt string
    )`,

  Insert_user: `INSERT INTO users( 
    name, 
    email, 
    hash,
    salt
    ) VALUES 
    (?,?,?,?)`,

  Select_user: `SELECT * FROM users`,
  Find_user: `SELECT * FROM users WHERE email = ?`,

  CREATE_EXERCISE_CATEGORY_TABLE: `CREATE TABLE IF NOT EXISTS excercises(
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    taskName text,
    subTaskName text
    )`,
  INSERT_TO_EXERCISE_CATEGORY: `INSERT INTO excercises (
    taskName,
    subTaskName
  )
    VALUES(?,?)
          `,
  LOAD_EXERCISE_CATEGORY: `SELECT * FROM excercises`,

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
  LOAD_USER_EXERCISE: `SELECT * FROM excercises WHERE userId=?`,
  DELETE_USER_EXERCISE: `DELETE FROM excercises WHERE id=?`
};
