const express = require("express");
const { parse } = require("path");
const port = 3000;
const path = require("path");
const app = express();
const {load , save} = require("./utils");


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.listen(port, () => {
  console.log(`The server is running succesfully on the http://localhost:${port}. `);
});
