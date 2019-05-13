exports.parseTrending = function(rawData) {
  var trendingGifs = [];

  for (i = 0; i < rawData.data.data.length; i++) {
    trendingGifs.push({
      title: rawData.data.data[i].title,
      link: rawData.data.data[i].url,
      img: rawData.data.data[i].images.downsized.url
    });
  }

  return trendingGifs;
};
