const express = require("express");
const axios = require("axios");
const stringify = require("json-stringify-safe");
var bodyParser = require("body-parser");

const giphyEndpoints = require("./giphyEndpoints.js");

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// GET /api/v1/test
// Returns "hello world"
app.get("/api/v1/test", function(req, res) {
  res.status(200).send("hello world");
});

// GET /api/v1/trending
// Returns trending GIF information
// TODO - parse on backend and send list of GIF URLs in response
app.get("/api/v1/trending", function(req, res) {
  axios
    .get(giphyEndpoints.trendingApiReq)
    .then(function(response) {
      // working but unsure data is usuable, will have to test on front end
      let parsedResponse = stringify(response);
      res.status(200).send({ parsedResponse });
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.post("/api/v1/search", function(req, res) {
  var query = req.body.query;
  giphySearchApiUrl = giphyEndpoints.giphyApiSearchString(query);

  axios
    .get(giphySearchApiUrl)
    .then(function(response) {
      let parsedResponse = stringify(response);
      res.status(200).send({ parsedResponse });
    })
    .catch(function(error) {
      console.log(error);
    });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
