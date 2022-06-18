const Database = require("better-sqlite3");
// =======================================================
// Database
// =======================================================
function initializedDB() {
  let Ldb = new Database(
    "src/database/database.db",
    Database.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
  module.exports = {
    Ldb
  }
}

module.exports = {
    initializedDB
  }