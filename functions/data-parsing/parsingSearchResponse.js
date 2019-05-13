exports.parseSearch = function(rawData) {
  var searchedGifs = [];

  for (i = 0; i < rawData.data.data.length; i++) {
    searchedGifs.push({
      title: rawData.data.data[i].title,
      link: rawData.data.data[i].url,
      img: rawData.data.data[i].images.downsized.url
    });
  }

  return searchedGifs;
};
