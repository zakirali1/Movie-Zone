/// THIS SCRIPT IS ADDED TO THE INDEX_1.HTML

////FUNCTION TO GET SEARCHED MOVIE USING OMDB-API


let title = $("#movieTitle")
let desc = $("#content");
let result;


function getMovie(movieTitle){

  // $("#container").empty();
  // $("#content").empty();
  $("#wrapper").empty();
    var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    result = response;

    console.log(response.Ratings[0].Source)
    
    // creating dynamic elements
 let div1 = $("<div>").attr("id", "movie-details");
 let head = $("<h5>").addClass("card-title").attr("id", "movie-title").text(response.Title);
 let poster = $("<img>").addClass("card-image-top").attr("src", response.Poster);

//  appending dynamic elements to movie-title attribute
 $("#movie-details").prepend(head, poster)
    $("#wrapper").append(div1)
   
    // call get ratings func
    getRating(response)


  });
}

const getRating = response => {

  // dynamically creating tags and attributes below

 let contentDiv = $("<div>").attr("id", "content");

  let header = $("<h2>").text("Plot: ")
  let p = $("<p>").text(response.Plot);
  let rating = $("<p>").text("Rating: " + response.Rated);
  $("#content").append(header, p, rating);
 
  for (let i = 0; i < response.Ratings.length; i++) {

  let source = $("<p>").text(response.Ratings[i].Source)
  let val = $("<p>").text(response.Ratings[i].Value)
  $("#content").append(source,val);
  

};

$("#wrapper").append(contentDiv);

};


// click function to callback getMovie function

$(".search-button").on('click', function(event){

  event.preventDefault();
  let userInput = $("#search-box").val().trim();

  console.log(userInput);
  

  // saving user input to local storage for manipulation later
   localStorage.setItem("searchInput", userInput);

  // let userInputYear = $("#search-year").val().trim();
  // console.log(userInput);
  // console.log(userInputYear);

  // saving user input to local storage for manipulation later
   localStorage.setItem("searchInput", userInput);
  //  localStorage.setItem("searchYear", userInputYear),

  getMovie(userInput);

});