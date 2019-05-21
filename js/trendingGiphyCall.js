////////////////
////////////////
// Important Variable(s)
////////////////
////////////////

var giphyKey = "NULL";

function clearDiv() {
  // ternary operator - if the results div has children, remove them
  if ($("#results").children().length) {
    $("#results").empty();
  }
}

////////////////
////////////////
// On page load, get trending gifs from Giphy and put on top of page
////////////////
////////////////
$(function() {
  var activeSlide = "active";

  var trendingApiReq =
    "https://api.giphy.com/v1/gifs/trending?api_key=" +
    giphyKey +
    "&limit=15" +
    "&rating=pg";

  // send the GET request to GIPHY
  $.get(trendingApiReq, function(data, status) {
    var parsedData = $.parseJSON(JSON.stringify(data));
    for (i = 0; i < parsedData.data.length; i++) {
      i == 0 ? (activeSlide = "active") : (activeSlide = "");
      $("#slider").append(`
        <div>
           <img class="slider-img" src="${
             parsedData.data[i].images.downsized.url
           }" alt="${parsedData.data[i].title}" />
         </div>`);
    }
    $(".slick-slider").slick({
      infinite: false,
      speed: 10000,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 1,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 540,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  });
  clearDiv();
});

// #trending-banner
