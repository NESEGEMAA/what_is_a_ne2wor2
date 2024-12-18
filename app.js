let express = require("express");
const session = require("express-session");
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

app.use(
  session({
    secret: "zingema",
    resave: false,
    saveUninitialized: true,
  })
);

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  }
});

app.get("/", function (_req, res) {
  res.render("login", { title: "express", message: "" });
});

app.get("/home", function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }
  res.render("home");
});

app.get("/registration", function (req, res) {
  res.render("registration");
});

app.get("/annapurna", function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }

  res.render("annapurna");
});

app.get("/bali", function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }

  res.render("bali");
});

app.get("/cities", function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }

  res.render("cities");
});

app.get("/hiking", function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }

  res.render("hiking");
});

app.get("/inca", function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }

  res.render("inca");
});

app.get("/islands", function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }

  res.render("islands");
});

app.get("/paris", function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }

  res.render("paris");
});

app.get("/rome", function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }

  res.render("rome");
});

app.get("/santorini", function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }

  res.render("santorini");
});

app.post("/", async function (req, res) {
  const user = await getDb()
    .collection("myCollection")
    .find({ username: req.body.username, password: req.body.password })
    .toArray();
  console.log(user);
  if (user.length != 0) {
    req.session.username = req.body.username;
    res.redirect("/home");
  } else {
    res.render("login", { message: "Incorrect username or password." });
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

  if (results.length === 0) {
    res.send(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      
          <!-- Google Font -->
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&display=swap" rel="stylesheet">
      
          <style>
              html, body {
                  margin: 0;
                  padding: 0;
                  height: 100%;
                  font-family: 'Montserrat', sans-serif;
                  background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  overflow: hidden;
              }
      
              .message {
                  color: #ffffff;
                  font-size: 3rem;
                  text-transform: uppercase;
                  letter-spacing: 0.15em;
                  font-weight: 700;
                  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
                  position: relative;
                  margin-bottom: 50px;
              }
      
              .message::before {
                  content: '';
                  position: absolute;
                  left: -10%;
                  right: -10%;
                  bottom: -30%;
                  height: 4px;
                  background: rgba(255,255,255,0.5);
                  box-shadow: 0 0 10px rgba(255,255,255,0.2), 0 0 20px rgba(255,255,255,0.2);
                  transform: skewX(-20deg);
              }
      
              .back-button {
                  background: #ffffff;
                  color: #fda085;
                  border: none;
                  padding: 15px 30px;
                  font-size: 1rem;
                  font-weight: 700;
                  letter-spacing: 0.05em;
                  border-radius: 25px;
                  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                  cursor: pointer;
                  transition: all 0.3s ease;
                  text-transform: uppercase;
              }
      
              .back-button:hover {
                  background: #fda085;
                  color: #ffffff;
              }
          </style>
      </head>
      <body>
          <div class="message">No destination found</div>
          <button class="back-button" onclick="history.back()">Go Back</button>
      </body>
      </html>`);
  } else {
    res.render("searchresults", { results });
  }
});

app.get("/wanttogo", async function (req, res) {
  if (req.session.username == undefined) {
    res.redirect("/");
    return;
  }
  
  const user = await getDb()
    .collection("myCollection")
    .find({ username: req.session.username })
    .toArray();
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
    res.json({
      success: true,
      message: result.message,
      destination: result.destinationName,
    });
  } catch (error) {
    console.error("Error adding destination:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
