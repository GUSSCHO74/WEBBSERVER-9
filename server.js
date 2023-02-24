const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "comments_db",
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/uppgift9.html");
});

app.get("/add-posts", (req, res) => {
  let sql = `SELECT * FROM comment ORDER BY timestamp DESC`;
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render("get", { result });
  });
});

app.post("/add_posts", (req, res) => {
  const name = req.body.name;
  const comment = req.body.comment;
  var sql = `INSERT INTO comment (name, comment) VALUES ('${name}', '${comment}')`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    res.redirect("/add-posts");
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});