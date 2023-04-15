const APIKey = "2407265d623bf7d962c05a67c5a0fc7d";

var searchBar = document.getElementById('searchBar');
var searchButton = document.getElementById('searchButton');
var forecast = document.getElementsByClassName('forecast');
var selectedCity = document.getElementsByClassName('selectedCity');
var cityButtons = document.getElementsByClassName('cityButtons');

searchButton.addEventListener('click', function () {
    if (searchBar.value) {
        localStorage.setItem("city", searchBar.value);
        searchBar.value = "";
    } else {
        alert("Please enter a City name");
    }
    getWeather();
    return;
});

function getWeather() {
    var cityName = localStorage.getItem("city");
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.list.length; i++) {
                console.log(data.list[i]);
                console.log(data.list[i].dt_txt);
                console.log(data.list[i].main.temp);
                console.log(data.list[i].wind.speed);
                console.log(data.list[i].main.humidity);
                console.log(data.list[i].weather[0].icon);
  
            }
        })
};