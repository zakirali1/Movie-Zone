/// THIS SCRIPT IS ADDED TO THE INDEX_1.HTML

////FUNCTION TO GET SEARCHED MOVIE USING OMDB-API

// pull the latest values for favourites array from local storage
let favs = JSON.parse(localStorage.getItem("favourites")) || [];


// setting global variables for later use
let title = $("#movieTitle");
let desc = $("#content");
let result;
let currentVal;

// core function to make the api call and get back resutls
function getMovie(movieTitle) {
  
// empty dynamic elements first
  $("#wrapper").empty();
  var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    result = response;

    console.log(response.Ratings[0].Source);

    //  set local storage variables and values for use with pricerunner page
    localStorage.setItem("Year", response.Year)

    // dynamic elements 
    let div2 = $("<div>").addClass("row no-gutters rowContent");
    let col = $("<div>").addClass("col-md-4");
    div2.append(col);
    let poster = $("<img>")
      .addClass("card-image-top")
      .css({ height: "550px", width: "550px" })
      .attr("src", response.Poster);
    col.append(poster);
    $("#wrapper").append(div2);
   
    getRating(response);
  });
}

const getRating = (response) => {
  // dynamic elements creation
  let divs = $("<div>").addClass("col-md-8");
  $(".rowContent").append(divs);
  let div2 = $("<div>").addClass("card-body");
  let head = $("<h4>").addClass("card-title").text(response.Title);
  let header = $("<p>").text("Description: ");
  let p = $("<p>").text(response.Plot);
  let rating = $("<p>").text("Rating: " + response.Rated);
  let like = $("<button>").attr("id", "thumbsUp");
  let thumbsUp = $("<i>").addClass("far fa-thumbs-up").attr("id", "thumbsU");
  like.append(thumbsUp);
  let unlike = $("<button>").attr("id", "thumbsDown");
  let thumbsDown = $("<i>")
    .addClass("far fa-thumbs-down")
    .attr("id", "thumbsD");
  unlike.append(thumbsDown);
  div2.append(head, header, p, rating);
  let buttonHead = $("<p>").addClass("card-button");
  let button1 = $("<button>")
    .attr("type", "button")
    .addClass("btn-sm btn-primary click-me")
    .text("Watch Now");
  buttonHead.append(button1);
  divs.append(div2);

//   create a list of all ratings and scores from critics
  for (let i = 0; i < response.Ratings.length; i++) {
    let source = $("<p>").text(response.Ratings[i].Source);
    let val = $("<p>").text(response.Ratings[i].Value);
    $(".card-body").append(source, val, like, unlike, buttonHead);
  }

  
};

// click function to callback getMovie function

$(".search-button").on("click", function (event) {
  event.preventDefault();
  let userInput = $("#search-box").val().trim();

  console.log(userInput);

  // saving user input to local storage for manipulation later
  localStorage.setItem("searchInput", userInput);

  getMovie(userInput);

});

// event handler for thumbs up click

$(document).on("click", "#thumbsUp", function (e) {

  let userIn = $("#search-box")
  .val()
  .toLowerCase()
  .trim()

  // change classes and look based on class status
  if ($("#thumbsU").hasClass("far fa-thumbs-up")) {
    $("#thumbsU").removeClass().addClass("fas fa-thumbs-up");
   
    // if search box is not empty, use that to populate and call voteup
    if (userIn) {
      voteUp(userIn) 
// else use the value of the dropdown anchor tags
    } else if((currentVal))
    voteUp(currentVal)

  } else {
    $("#thumbsU").removeClass().addClass("far fa-thumbs-up");
    // favs.splice(userIn, 1)
  }
});

$(document).on("click", "#thumbsDown", function (e) {
 
  let userIn = $("#search-box")
  .val()
  .toLowerCase()
  .trim()
 // change classes and look based on class status
  if ($("#thumbsD").hasClass("far fa-thumbs-down")) {
    $("#thumbsD").removeClass().addClass("fas fa-thumbs-down");

     // if search box is not empty, use that to populate and call voteup
    if (userIn) {
      voteDown(userIn) 
// else use the value of the dropdown anchor tags
    } else if((currentVal))
    voteDown(currentVal)
   
  } else {
    $("#thumbsD").removeClass().addClass("far fa-thumbs-down");
  }
});

$(".button5").on("click", function(e) {
  // $(this).data("country");

  let country = $(this).data("country");
  // console.log(this.dataset.country)

  localStorage.setItem("country", country);
});

// redirect handler for second html page (price runner)
$(document).on("click", ".click-me", function (e) {
 // window.location.href = "../../pricesearch.html";
 window.open("./pricesearch.html");
});


// if value doenst already exist in my local storage, push title to array and display in local storage
const voteUp = userVal => {
  if (!favs.includes(userVal)) {
    favs.push(userVal)
    localStorage.setItem("favourites", JSON.stringify(favs))
    console.log(favs)
    // reload the page to pull latest results
    location.reload();
  };
  
};

// if value already exists in localstorage then remove from array
const voteDown = userVal => {

    if(favs.includes(userVal)) {
   let where = favs.indexOf(userVal)
   favs.splice(where, 1)
   localStorage.setItem("favourites", JSON.stringify(favs))
   location.reload();
   
    };
  };

 
// dynamic elements created for drop down list, based on user likes
  $(document).on("click", ".dropl", function() {
    let moviesL =  JSON.parse(localStorage.getItem("favourites"))
    // event.preventDefault()
    if($(this).hasClass(`show`)) {
      
      let dropmenu = $(".dropdown-menu.show");
      moviesL.forEach(element => {
        dropItems =  $("<a>").addClass("dropdown-item").attr("href", "#").text(element)
        dropmenu.append(dropItems)
        console.log(favs)
        
    });
  
    
};


});

// grab the value of the anchor tag text and call back core function so user can use this as a shortcut for search
$(document).on("click", ".dropdown-menu .dropdown-item", function(event) {
  event.preventDefault()

    currentVal = $(this).text().trim()
    console.log(currentVal)
  
    getMovie(currentVal);
    


});

