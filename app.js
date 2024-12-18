let express = require("express");
const session = require('express-session');
let path = require("path");
let { connectToDb, getDb } = require("./controller/db");
let userroutes = require("./routes");
const { Db } = require("mongodb");
let app = express();
let port = 3000;

const { addToWantToGoList } = require("./model/usermodel");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(userroutes);

app.use(session({
  secret: 'zingema',
  resave: false,
  saveUninitialized: true
}));

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

app.post("/", async function (req, res) {
  const user = await getDb().collection("myCollection").find({username: req.body.username, password: req.body.password}).toArray();
  console.log(user);
  if (user.length != 0) {
    req.session.username = req.body.username;
    res.redirect("/home");
  } else {
    res.redirect("/registration");
  }
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

app.get("/wanttogo", async function (req, res) {
  console.log(req.session);
  const user = await getDb().collection("myCollection").find({ username: req.session.username }).toArray();
  res.render("wanttogo", { wantToGo: user[0].wantToGo });
});

app.post("/add-to-wanttogo", async (req, res) => {
  try {
    const username = req.session.username;
    const { destination } = req.body;

    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const result = await addToWantToGoList(username, destination);
    res.json({ success: true, message: result.message, destination: result.destinationName });
  } catch (error) {
    console.error("Error adding destination:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
