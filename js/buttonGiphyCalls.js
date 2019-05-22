////////////////
////////////////
// Important Variable(s)
////////////////
////////////////

var giphyKey = "NULL";

////////////////
////////////////
// AJAX Loading Detection
////////////////
////////////////
var loading = false;

$(document).ajaxStart(function() {
  loading = true;
  loadingSpinner();
});

$(document).ajaxComplete(function() {
  loading = false;
});

////////////////
////////////////
// Reusable Snippets
////////////////
////////////////

function clearDiv() {
  // ternary operator - if the results div has children, remove them
  if ($("#results").children().length) {
    $("#results").empty();
  }
}

function loadingSpinner() {
  // adds a simple loading spinner, need to use 3x so better to write
  // as a function instead of inline
  $("#results").append(
    `<svg viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20" />
    </svg>`
  );
}

function scrollToAnchor(aid) {
  var aTag = $("a[name='" + aid + "']");
  $("html,body").animate({ scrollTop: aTag.offset().top }, "slow");
}

////////////////
////////////////
// Button Functions
////////////////
////////////////

// Search Button Functionality
$("#giphySearch").submit(function(e) {
  clearDiv();

  // prevents page reload action on submit
  e.preventDefault();

  // assign input field to var
  var query = $("#gifSearchQuery").val();

  // check if empty to throw error in form
  if (query == "") {
    $("#gifSearchQuery").addClass("form-error animated shake");
    // return stops the code block so it doesn't try to API request
    // with a blank input
    return false;
  }

  // assemble the request URL
  var searchApiReq =
    "https://api.giphy.com/v1/gifs/search?api_key=" +
    giphyKey +
    "&q=" +
    query +
    "&limit=30" +
    "&rating=pg";

  // send the GET request to GIPHY
  $.get(searchApiReq, function(data, status) {
    var parsedData = $.parseJSON(JSON.stringify(data));
    clearDiv();
    for (i = 0; i < parsedData.data.length; i++) {
      $("#results").append(
        `<div class="col-md-3 mb-5 text-center">
        <a href=${parsedData.data[i].url}>
        <img class="img-fluid" src="${
          parsedData.data[i].images.downsized_large.url
        }" alt="${parsedData.data[i].title}" />
        </a>
      </div>`
      );
    }

    if (parsedData.data.length < 1) {
      $("#search-string").empty();
      $("#search-string").append(
        `<div class="col-md-4 mb-5"><h5>No results for "${query}", <br/> try another search!</h5></div>`
      );
      return false;
    }

    $("#search-string").empty();
    $("#search-string").append(
      `<div class="col-md-4 mb-5"><h5>GIF results for "${query}"</h5></div>`
    );
    $("#gifSearchQuery").removeClass("form-error animated shake");
  });

  scrollToAnchor("#results");

  // sets text field input back to blank
  $("#gifSearchQuery").val("");
});

// Lucky Button Functionality
$("#lucky").click(function(e) {
  clearDiv();

  // make string for random gif endpoint request
  var randomApiReq =
    "https://api.giphy.com/v1/gifs/random?api_key=" + giphyKey + "&rating=pg";

  // GET request with .fail in case errors are returned
  $.get(randomApiReq, function(data, status) {
    var parsedData = $.parseJSON(JSON.stringify(data));
    clearDiv();
    $("#results").append(
      `<div class="col-lg-6 mb-5">
      <a href=${parsedData.data.url}>
        <img src="${parsedData.data.images.downsized_large.url}" alt="${
        parsedData.data.title
      }" />
      </a>
      </div>`
    );
  });
  scrollToAnchor("#results");
  $("#gifSearchQuery").removeClass("form-error animated shake");
});
