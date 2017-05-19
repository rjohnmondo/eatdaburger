var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override"); // allows for the HTML 5 not existing
var mysql = require("mysql");
var exphbs = require("express-handlebars");

var app = express();
var port = 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connecton to Database
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Badger32",
    database: "eatdaburger"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("You are connected to EatDaBurger APP using connection : " + connection.threadId);

});

// GETS INFO FROM SQL
app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      throw err;
    }

    res.render("index", { burgers: data });

  });
});


// POSTS BURGERS TO SQL
app.post("/", function(req, res) {
  connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burgerAdd], function(err, result) {
    if (err) {
      throw err;
    }

    res.redirect("/");
  });
});

app.listen(port);