// I would never hardcode a key like this but have done it here
// so that you can use the app without having to modify it.
// usually I would just have a separate file called "keys"
// that I would put it in. I would then add it to the .gitignore
// so that it's not shown in the repo. I've demonstrated this
// in this repository's .gitignore

////////////////
////////////////
// Important Variable(s)
////////////////
////////////////

var giphyKey = "null";

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

  var trendingApiReq = "https://gif-aggregator.herokuapp.com/api/v1/trending";

  // send the GET request to GIPHY
  $.get(trendingApiReq, function(data, status) {
    for (i = 0; i < data.length; i++) {
      i == 0 ? (activeSlide = "active") : (activeSlide = "");
      $("#slider").append(`
        <div>
           <img class="slider-img" src="${data[i].img}" alt="${
        data[i].title
      }" />
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
