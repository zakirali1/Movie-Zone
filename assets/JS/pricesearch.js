var countryAbbr = "uk";
var movieTitle = "avatar";

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
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

}
watchOptions(countryAbbr, movieTitle);