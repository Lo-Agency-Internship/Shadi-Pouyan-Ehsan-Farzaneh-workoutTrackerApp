const Database = require("better-sqlite3");
const fs = require("fs");
// =======================================================
// Database
// =======================================================
let path = "./src/database/database.db";
let Ldb
Ldb = new Database(
  "src/database/database.db",
  Database.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

module.exports = {
  Ldb,
};