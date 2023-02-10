var countryAbbr = "uk";
var movieTitle = localStorage.getItem("searchInput");
 var yearInput = localStorage.getItem("searchYear");
 

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

            var movieTitleFound = movieData[t].title;
            var movieYear = movieData[t].year;
            var options = movieData[t].options;
            var buyOption = movieData[t].options.buy
            
           // console.log(options);
            /// ADDING THE MOVIE DETAILS
            if(movieTitle == ((movieTitleFound).toLowerCase())  && yearInput == movieYear ){
               
                ///MOVIE TITIE
                $(".navbar-brand").text(movieTitleFound);
               
                ///CONDITION TO DISPLAY THE BUY CARD OPTION
                console.log(buyOption);
                for(b = 0; b < buyOption.length; b++){
                    var provider = buyOption[b].provider;
                    var price = buyOption[b].pricing;
                    var url = buyOption[b].providerUrl;

                    ///REMOVE DISPLAY YOUTBE DETAILS IF CONDITION IS TRUE
                    if(provider === "YouTube"){
                        $("#you-tube").removeAttr("hidden");
                        $("#you-tube").append($("<p>").text())

                        

                    }
                }
                
                

            } 
            
           
           
        }

    });


}
watchOptions(countryAbbr, movieTitle);