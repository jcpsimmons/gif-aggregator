const keys = require("./keys/keys");

exports.trendingApiReq =
  "https://api.giphy.com/v1/gifs/trending?api_key=" +
  keys.giphyKey +
  "&limit=15" +
  "&rating=pg";

exports.giphyApiSearchString = function(q) {
  var searchString =
    "https://api.giphy.com/v1/gifs/search?api_key=" +
    keys.giphyKey +
    "&q=" +
    q +
    "&limit=30" +
    "&rating=pg";
  return searchString;
};
