// I would never hardcode a key like this but have done it here
// so that you can use the app without having to modify it.
// usually I would just have a separate file called "keys"
// that I would put it in. I would then add it to the .gitignore
// so that it's not shown in the repo. I've demonstrated this
// in this repository's .gitignore

////////////////
////////////////
<<<<<<< HEAD:js/buttonGiphyCalls.js
=======
// Important Variable(s)
////////////////
////////////////

var giphyKey = "null";

////////////////
////////////////
>>>>>>> 481a3ad21ff71828c499b438025c4f8c903040d0:public/js/buttonGiphyCalls.js
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
    "https://gif-aggregator.herokuapp.com/api/v1/search?query=" + query;

  // send the GET request to GIPHY
  $.post(searchApiReq, function(data, status) {
    clearDiv();
    for (i = 0; i < data.length; i++) {
      $("#results").append(
        `<div class="col-md-3 mb-5 text-center">
        <a href=${data[i].url}>
        <img class="img-fluid" src="${data[i].img}" alt="${data[i].title}" />
        </a>
      </div>`
      );
    }

    if (data.length < 1) {
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
  var randomApiReq = "https://gif-aggregator.herokuapp.com/api/v1/lucky";

  // GET request with .fail in case errors are returned
  $.get(randomApiReq, function(data, status) {
    clearDiv();
    $("#results").append(
      `<div class="col-lg-6 mb-5">
      <a href=${data[0].link}>
        <img src="${data[0].img}" alt="${data[0].title}" />
      </a>
      </div>`
    );
  });
  scrollToAnchor("#results");
  $("#gifSearchQuery").removeClass("form-error animated shake");
});
