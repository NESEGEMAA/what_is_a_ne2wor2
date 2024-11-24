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
app.use(userroutes);

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  }
});

app.get("/", function (_req, res) {
  res.render("login", { title: "express" });
});

app.get("/home", function (_req, res) {
  res.render("home");
});

app.get("/registration", function (_req, res) {
  res.render("registration");
});

app.get("/annapurna", function (_req, res) {
  res.render("annapurna");
});

app.get("/bali", function (_req, res) {
  res.render("bali");
});

app.get("/cities", function (_req, res) {
  res.render("cities");
});

app.get("/hiking", function (_req, res) {
  res.render("hiking");
});

app.get("/inca", function (_req, res) {
  res.render("inca");
});

app.get("/islands", function (_req, res) {
  res.render("islands");
});

app.get("/paris", function (_req, res) {
  res.render("paris");
});

app.get("/rome", function (_req, res) {
  res.render("rome");
});

app.get("/santorini", function (_req, res) {
  res.render("santorini");
});

app.post("/search", function (req, res) {
  const search = req.body.Search ? req.body.Search.toLowerCase() : "";
  const arr = [
    { name: "Inca Trail to Machu Picchu", link: "/inca" },
    { name: "Annapurna Circuit", link: "/annapurna" },
    { name: "Paris", link: "/paris" },
    { name: "Rome", link: "/rome" },
    { name: "Bali Island", link: "/bali" },
    { name: "Santorini Island", link: "/santorini" },
  ];

  const results = arr.filter((item) =>
    item.name.toLowerCase().includes(search)
  );

  res.render("searchresults", { results });
});

app.get("/wanttogo", function (_req, res) {
  res.render("wanttogo");
});
