const APIKey = "2407265d623bf7d962c05a67c5a0fc7d";

var searchBar = document.getElementById('searchBar');
var searchButton = document.getElementById('searchButton');
var forecast = document.getElementsByClassName('forecast');
var selectedCity = document.getElementById('selectedCity');
var cityButtons = document.getElementsByClassName('cityButtons');
const currentPicEl = document.getElementById("current-pic");


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
            var table = document.createElement('table')
            var createTableRow = document.createElement('tr');
            for (var i = 5; i < data.list.length; i += 8) {
                
                console.log(data.list[i].dt_txt);
                console.log(data.list[i].main.temp);
                console.log(data.list[i].wind.speed);
                console.log(data.list[i].main.humidity);
                console.log(data.list[i].weather[0].icon);
                

            }

            // (K − 273.15) × 9/5 + 32 = °F is formula for k to f
            let weatherPic = (data.list[0].weather[0].icon);
            let date = (data.list[0].dt_txt);
            let temp = (data.list[0].main.temp);
            temp = temp - 273.15;
            temp = temp * 9;
            temp = temp / 5;
            temp = temp + 32;
            let windSpeed = (data.list[0].wind.speed);
            let humidity = (data.list[0].main.humidity);
            selectedCity.textContent = cityName + " (" + dayjs(date).format('MM/DD/YYYY') + ") ";
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt", data.list[0].weather[0].description);
            selectedCity.append(currentPicEl);
            currentPicEl.append(weatherPic);

            selectedCity.appendChild(table);
            table.append("Temp: " + Math.round(temp) + "°F");
            table.append(createTableRow);
            createTableRow.append("Wind: " + Math.round(windSpeed) + " MPH");
            let createTableRow1 = (document.createElement('tr'));
            createTableRow.appendChild(createTableRow1);
            createTableRow1.append("Humidity: " + humidity + " %");
        })
};