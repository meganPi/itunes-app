const express = require("express");
const app = express();
const fetch = require("node-fetch");
const helmet = require('helmet')
const path = require("path");

//code to include default helmet security
app.use(helmet())

//bodyparser middleware included, so we can access the body property
//sent from the frontend
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//PORT assigned below

//Code responsible for fetching data from
//the iTuned API
app.post("/search", (req, res) => {
  let str = req.body.searchFor;
  //below code will check for any empty spaces and insert
  //a '+' so that the API can load the correct results
  let replaced = str.split(" ").join("+");
  fetch(
    `https://itunes.apple.com/search?term=${replaced}&media=${req.body.media}&country=ZA`
  )
    .then(res => res.text())
    .then(response => {
      res.send(response);
    })
    .catch(error => console.log(error));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
//listening on PORT 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

