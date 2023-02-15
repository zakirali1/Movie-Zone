var countryAbbr = (localStorage.getItem("country")).toLowerCase();
var movieTitle = localStorage.getItem("Movie");
//var movieTitle = localStorage.getItem("searchInput");
var searchYear = localStorage.getItem("Year");

///ADDED SOME MOVIES YEAR IS STORED WITH AN HYPHEN
var yearSelected = searchYear.substring(0, 4);

///CONVERT THE STRING INDIA TO 2 CHARACHER VALUE
var countryChosen = "uk";
if(countryAbbr == "india"){
    var  countryChosen = "in"
}else if(countryAbbr == "uk" || "us") {
    var countryChosen = countryAbbr;
}else{
    countryChosen;
};



if((movieTitle.length !== 0) && (movieTitle !== ";") && (movieTitle !== "@")){

    $(".cards-container").attr("hidden", false);
    
    watchOptions(countryAbbr, movieTitle);

    ////FUNCTION TO SEARCH OPTIONS FOR BUY RENT OR STREAM FROM RAPID API
    function watchOptions(countryChosen, movieTitle){

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://where-can-i-watch1.p.rapidapi.com/search/" + countryChosen + "/" + movieTitle,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Key": "e66e20f6c5msh6733561e0cd98a7p16e8dbjsne70aa13f6496",
                "X-RapidAPI-Host": "where-can-i-watch1.p.rapidapi.com"
            }
        };
        $.ajax(settings).done(function (movieData) {

            for(let t = 0; t < movieData.length; t++){

                var movieTitleFound = movieData[0].title;
                var movieYear = movieData[0].year;
                var buyOption = movieData[0].options.buy;
                var rentOption = movieData[0].options.rent;
                var streamOption = movieData[0].options.stream;
                
                ///MOVIE DETAILS DISPLAY
                if(
                    (movieTitle == ((movieTitleFound).toLowerCase()) && yearSelected == movieYear) ||
                   (movieTitle == ((movieTitleFound).toUpperCase()) && yearSelected == movieYear) ||
                   (movieTitle.includes(movieTitleFound) && yearSelected == movieYear)
                    )
                    {
                    ///DISPLAYING MOVIE TITLE
                    $("#movie-title").text(movieTitleFound); 
                    $("#movie-year").text(movieYear);

                    ////DISPLAYING BUY OPTION LOGIC
                    if(buyOption){
                        $("#buy-card").attr("hidden", false);
                        
                        for(b = 0; b < buyOption.length; b++){
                            var buyProvider = buyOption[0].provider;
                            var buyPrice = buyOption[0].pricing;
                            var buyUrl = buyOption[0].providerUrl;
        
                            /// DISPLAYIG PROVIDER, PRICE AND URL FOR THE BUY OPTION
                            $(".movie-supplier-buy").text(buyProvider);
                            $("#price-buy").text("Pricing: " + buyPrice);
                            $("#url-buy").text("URL: " + buyUrl);
        
                            ///OPEN THE LINK WEBPAGE  ON A NEW WINDOW
                            $("#buy-now-btn").on("click", function(){
                                window.open(buyUrl);
                            });
        
                            ///RETURN BACK TO HOMEPAGE ON THE SAME WINDOW
                            retunHomeBtn();
                        };
                    };

                    ////RENT OPTION LOGIC
                    if(rentOption){
                        $("#rent-card").attr("hidden", false);
                        for( r = 0; r < rentOption.length; r++){

                            var rentProvider = rentOption[0].provider;
                            var rentPrice = rentOption[0].pricing;
                            var rentUrl = rentOption[0].providerUrl
        
                            /// DISPLAYIG PROVIDER, PRICE AND URL FOR THE RENT OPTION
                            $(".movie-supplier-rent").text(rentProvider);
                            $("#rent-price").text("Pricing: " + rentPrice);
                            $("#rent-url").text("URL: " + rentUrl);
        
                            ///OPEN THE LINK RENT WEBPAGE ON A NEW WINDOW
                            $("#rent-now-btn").on("click", function(){
                                window.open(rentUrl);
                            });
        
                            ///RETURN BACK TO HOMEPAGE ON THE SAME WINDOW
                            retunHomeBtn();
                        };
                    };

                    /////STREAM OPTION LOGIC
                    if(streamOption){
                        $("#stream-card").attr("hidden", false);
                        for( s = 0; s < streamOption.length; s++){
                            var streamProvider = streamOption[0].provider;
                            var streamPrice = streamOption[0].pricing;
                            var streamUrl = streamOption[0].providerUrl;
        
                            /// DISPLAYIG PROVIDER, PRICE AND URL FOR THE STREAM OPTION
                            $(".movie-supplier-stream").text(streamProvider);
                            $("#stream-price").text("Pricing: " + streamPrice);
                            $("#stream-url").text("URL: " + streamUrl);
                            
                            ///OPEN THE WEBPAGE ON A NEW WINDOW
                            $("#stream-now-btn"). on("click", function(){
                                window.open(streamUrl);
                            });
        
                            ///RETURN BACK TO HOMEPAGE ON THE SAME WINDOW
                            retunHomeBtn();
                        };
                    };
                    
                    ///WHAT TO DISPLAY IF NO MOVIE IS FOUND
                }else{
                    noMovieFound();
                };

                ////FUNCTION TO RETURN BACK TO HOMEPAGE ON THE SAME WINDOW
                function retunHomeBtn(){
                    var homeBtn = $(".home-btn");

                    homeBtn.on("click", function(){
                        window.location.href = "index_1.html";
                    });
                };
            };
        });
    };
}
else{
    console.log(" yes is empty of null");
    noMovieFound();
}

function noMovieFound(){
    $("#movie-title").text("whoops! Nothing to Display");
    $(".cards-container").attr("hidden", true);
}
 