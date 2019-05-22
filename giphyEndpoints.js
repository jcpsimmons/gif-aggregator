const gKey = process.env.APIKEY;

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
