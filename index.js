const express = require("express");
const { parse } = require("path");
const port = 3000;
const path = require("path");
const app = express();
const {load , save} = require("./utils");


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.set("view engine", "twig")
app.set("views", path.join(__dirname, "src", "pages"))

app.get("/edit", (req, res) => {
  res.render("edit.twig")
})

app.listen(port, () => {
  console.log(`The server is running succesfully on the http://localhost:${port}. `);
});
