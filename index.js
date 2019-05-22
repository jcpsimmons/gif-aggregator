const express = require("express");
const axios = require("axios");
var bodyParser = require("body-parser");

const giphyEndpoints = require("./giphyEndpoints.js");
const parsingTrendingResponse = require("./data-parsing/parsingTrendingResponse");
const parsingSearchResponse = require("./data-parsing/parsingSearchResponse");
const parsingLuckyResponse = require("./data-parsing/parsingLuckyResponse");

// configure app
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// GET /api/v1/test
// Returns "hello world"
app.get("/api/v1/test", function(res) {
  res.status(200).send("hello world");
});

// GET /api/v1/trending
// Returns trending GIF information
// TODO - parse on backend and send list of GIF URLs in response
app.get("/api/v1/trending", function(res) {
  axios
    .get(giphyEndpoints.trendingApiReq)
    .then(function(response) {
      return res
        .status(200)
        .send(parsingTrendingResponse.parseTrending(response));
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.get("/api/v1/lucky", function(res) {
  axios
    .get(luckyApiReq)
    .then(function(response) {
      return res
        .status(200)
        .send(parsingTrendingResponse.parseTrending(response));
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
      return res.status(200).send(parsingSearchResponse.parseSearch(response));
    })
    .catch(function(error) {
      console.log(error);
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
