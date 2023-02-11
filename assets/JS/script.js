/// THIS SCRIPT IS ADDED TO THE INDEX_1.HTML

////FUNCTION TO GET SEARCHED MOVIE USING OMDB-API


let title = $("#movieTitle")
let desc = $("#content");
let result;


function getMovie(movieTitle){

  // $("#container").empty();
  $("#content").empty();
  $("#movie-details").empty();
    var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy" + "&y=2013" ;

 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    result = response;
    console.log(response);
    // $("#title").text(response.Title)
    let titles = $("<h1>").text(response.Title)
    let poster = $("<img>").attr("src", response.Poster);
    // console.log(poster)
    // console.log(response.Plot)

    console.log(response.Ratings[0].Source)
    
    // $("#movie-details").append(poster, header,p,rating);
    let header = $("<h2>").text("Plot: ")
    let p = $("<p>").text(response.Plot);
    let rating = $("<p>").text("Rating: " + response.Rated);
    let score = $("<p>").text("IMDB: " + response.Ratings[0].Source)
    // desc.prepend(header,p,rating);
    $("#movie-details").append(titles,poster, header,p,rating);
    getRating(response)


  });
}

const getRating = response => {

  console.log(response)
  for (let i = 0; i < response.Ratings.length; i++) {

  let source = $("<p>").text(response.Ratings[i].Source)
  let val = $("<p>").text(response.Ratings[i].Value)
  $("#content").append(source,val)
}

}



// getMovie(movieTitle);

const dynamicEl = (movie) => {

  $("#title").text(movie.Title)
}

// click function to callback getMovie function

$(".search-button").on('click', function(event){

  event.preventDefault();
  let userInput = $("#search-box").val().trim();
  console.log(userInput);
  

  // saving user input to local storage for manipulation later
   localStorage.setItem("searchInput", userInput);
  getMovie(userInput);

})