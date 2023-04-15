const APIKey = "2407265d623bf7d962c05a67c5a0fc7d";

var searchBar = document.getElementById('searchBar');
var searchButton = document.getElementById('searchButton');
// need a function to gather search input for user and save to local storage
searchButton.addEventListener('click', function() {
    if (searchBar.value) {
        localStorage.setItem("city", searchBar.value);
        searchBar.value = "";
    } else {
        alert("Please enter a City name");
    }
    getWeather();
    return;
});

// need a function to take search input and make a call to weathermap API
// function needs to get input and give lat/lon data
function getWeather(cityName) {
    var cityName = localStorage.getItem("city");
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
        })
};