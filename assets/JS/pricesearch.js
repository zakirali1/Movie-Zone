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
            "X-RapidAPI-Key": "019e467246mshf72c997767dffd9p1eef74jsn9610ef09b9d2",
            "X-RapidAPI-Host": "where-can-i-watch1.p.rapidapi.com"
        }
    };
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

}
watchOptions(countryAbbr, movieTitle);