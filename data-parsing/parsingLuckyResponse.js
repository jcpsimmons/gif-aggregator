exports.parseLucky = function(rawData) {
  var luckyGifs = [];

  console.log(rawData.data.data);

  luckyGifs.push({
    title: rawData.data.data.title,
    link: rawData.data.data.url,
    img: rawData.data.data.images.downsized.url
  });

  return luckyGifs;
};
