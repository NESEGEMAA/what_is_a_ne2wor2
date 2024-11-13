let express = require("express");
let path = require("path");
let { connectToDb } = require("./controller/db");
let userroutes = require("./routes");
let app = express();
let port = 3000;
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  }
});
app.get("/", function (reg, res) {
  res.render("login", { title: "epxress" });
});
app.get("/home", function (req, res) {
  res.render("home");
});
app.get("/registration", function (req, res) {
  res.render("registration");
});
app.get("/annapurna", function (req, res) {
  res.render("annapurna");
});
app.get("/bali", function (req, res) {
  res.render("bali");
});
app.get("/cities", function (req, res) {
  res.render("cities");
});
app.get("/hiking", function (req, res) {
  res.render("hiking");
});
app.get("/inca", function (req, res) {
  res.render("inca");
});
app.get("/islands", function (req, res) {
  res.render("islands");
});
app.get("/paris", function (req, res) {
  res.render("paris");
});
app.get("/rome", function (req, res) {
  res.render("rome");
});
app.get("/santorini", function (req, res) {
  res.render("santorini");
});
app.get("/search", function (req, res) {
  res.render("searchresults");
});
app.get("/wanttogo", function (req, res) {
  res.render("wanttogo");
});

app.use(userroutes);
