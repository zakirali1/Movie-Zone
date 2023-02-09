/// THIS SCRIPT IS ADDED TO THE INDEX_1.HTML

////FUNCTION TO GET SEARCHED MOVIE USING OMDB-API
function getMovie(movieTitle){
    var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
}
getMovie(movieTitle);