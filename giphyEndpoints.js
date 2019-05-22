let gKey = null;

// check if running on heroku
// if local dev, use gitignored key file
if (process.env.CLOUDSTATUS == true) {
  gKey = process.env.APIKEY;
} else {
  const localKey = require("./keys/keys");
  gKey = localKey.giphyKey;
}

exports.trendingApiReq =
  "https://api.giphy.com/v1/gifs/trending?api_key=" +
  gKey +
  "&limit=15" +
  "&rating=pg";

exports.luckyApiReq =
  "https://api.giphy.com/v1/gifs/random?api_key=" + gKey + "&rating=pg";

exports.giphyApiSearchString = function(q) {
  var searchString =
    "https://api.giphy.com/v1/gifs/search?api_key=" +
    gKey +
    "&q=" +
    q +
    "&limit=30" +
    "&rating=pg";
  return searchString;
};
