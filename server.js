const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoCient = require("mongodb").MongoClient;

MongoCient.connect(
  `mongodb://staff:staff123@ds113732.mlab.com:13732/quotes`,
  { useNewUrlParser: true },
  (err, client) => {
    if (err) return console.error(err);
    db = client.db("quotes");
    // if the connection is established with the database only, we want to start our server.
    app.listen(3000, () => console.log("listening..."));
  }
);

app.set("view engine", "jade");
// urlencoded method is used to extract data from form element
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // get quotes from your mLab by using the find method
  db.collection("quotes")
    .find()
    .toArray((err, results) => {
      if (err) console.error(err);
      res.render("index", { quotes: results });
    });
});

app.get("/quotes", (req, res) => {
  res.render("form");
});

app.get("/quotes/:uid", (req, res) => {
  db.collection("quotes")
    .find()
    .toArray((err, results) => {
      if (err) console.error(err);
      res.render("haiku", { haiku: results[req.params.uid] });
    });
});

app.put("/quotes", (req, res) => {
  db.collection("quotes").findOneAndUpdate(
    { name: req.body.name },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      sort: { _id: -1 },
      upsert: true
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.post("/quotes", (req, res) => {
  db.collection("quotes").save(req.body, (err, result) => {
    if (err) return console.error(err);
    res.redirect("/");
  });
});

app.delete("/quotes", (req, res) => {
  db.collection("quotes").findOneAndDelete(
    { name: req.body.name },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send({ message: "Your haiku is deleted!" });
    }
  );
});
