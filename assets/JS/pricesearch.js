var countryAbbr = "uk";
var movieTitle = localStorage.getItem("searchInput");
//var yearInput = localStorage.getItem("searchYear");
 


watchOptions(countryAbbr, movieTitle);

////FUNCTION TO SEARCH OPTIONS FOR BUY RENT OR STREAM FROM RAPID API
function watchOptions(countryAbbr, movieTitle){

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://where-can-i-watch1.p.rapidapi.com/search/" + countryAbbr + "/" + movieTitle,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "5f34861ca5mshdea1b2f878a0930p11d003jsnc7f309357993",
            "X-RapidAPI-Host": "where-can-i-watch1.p.rapidapi.com"
        }
    };
    $.ajax(settings).done(function (movieData) {

        console.log(movieData);

        for(let t = 0; t < movieData.length; t++){

            var movieTitleFound = movieData[0].title;
            var movieYear = movieData[0].year;
            var options = movieData[0].options;
            var buyOption = movieData[0].options.buy;
            var rentOption = movieData[0].options.rent;
            var streamOption = movieData[0].options.stream;
            
            ///MOVIE DETAILS DISPLAY
            if(movieTitle == ((movieTitleFound).toLowerCase())){
                
                ///DISPLAYING MOVIE TITLE
                $("#movie-title").text(movieTitleFound + " " + movieYear); 

                ////DISPLAYING BUY OPTION LOGIC
                
                /* console.log(options);
                if(options === buyOption){
                    console.log("yes it is")
                }else { console.log("no");} */

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
                }
                ////RENT OPTION LOGIC
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
                }
                /////STREAM OPTION LOGIC
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


                ///WHAT TO DISPLAY IF NO MOVIE IS FOUND
            }else {
                $("#movie-title").text("whoops! Nothing to display");
                $(".container").attr("hidden", true);
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


}

