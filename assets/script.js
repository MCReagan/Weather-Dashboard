const APIKey = "2407265d623bf7d962c05a67c5a0fc7d";

var searchBar = document.getElementById('searchBar');
var searchButton = document.getElementById('searchButton');
var forecast = document.getElementsByClassName('forecast');
var selectedCity = document.getElementById('selectedCity');
var cityButtons = document.getElementsByClassName('cityButtons');
const currentPicEl = document.getElementById("current-pic");

// this event listener listens to the search bar button to be pressed and sets the value of cityName in local storage as the value of the text entered in the box above it
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

// this function sets the value of cityName in local storage as the value of the button clicked
function buttonCity(e) {
    localStorage.setItem("city", e);
    getWeather();
    return;
}

function getWeather() {
    var cityName = localStorage.getItem("city");
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
    // fetch gets the JSON object from openweathermap api
    fetch(queryURL)
        .then(function (response) {
            if (response.status !== 404) {
                return response.json();
            } else {
                alert("Please enter a valid city name.")
                localStorage.clear;
                window.history.go(0);
                return;
            }
        })
        // this function sets the content of the page to data obtained from openweathermap api
        .then(function (data) {
            var tableWeather = [];
            var tableWeather1 = [];
            var table = document.createElement('table')
            var createTableRow = document.createElement('tr');
            // (K − 273.15) × 9/5 + 32 = °F is formula for k to f
            let weatherPic = (data.list[0].weather[0].icon);
            let date = (data.list[0].dt_txt);
            let temp = (data.list[0].main.temp);
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
            table.appendChild(createTableRow1);
            createTableRow1.append("Humidity: " + humidity + " %");
            // this for loop creates an array of objects that contain information for the 5 day forecast
            for (var i = 7; i < data.list.length; i += 8) {
                tableWeather[i] = {
                    date: (data.list[i].dt_txt),
                    weatherPic: (data.list[i].weather[0].icon),
                    temp: (Math.round((data.list[i].main.temp))),
                    windSpeed: (Math.round((data.list[i].wind.speed))),
                    humidity: (data.list[i].main.humidity)
                }
                tableWeather1.push(tableWeather[i]);
            }
            // this for loop creates tables for info in 5 day forecast and appends info from object tableWeather1
            for (var i = 0; i < 5; i++) {
                var createImage = document.createElement('img');
                var table1 = document.createElement('table');
                var createTableRow2 = document.createElement('tr');
                var createTableRow3 = document.createElement('tr');
                var createTableRow4 = document.createElement('tr');
                forecast[i].textContent = dayjs(tableWeather1[i].date).format('MM/DD/YYYY');
                forecast[i].appendChild(table1);
                table1.append(createTableRow4);
                createTableRow4.append(createImage);
                createImage.setAttribute("src", "https://openweathermap.org/img/wn/" + tableWeather1[i].weatherPic + "@2x.png");
                createImage.append(tableWeather1[i].weatherPic);
                table1.append("Temp: " + tableWeather1[i].temp + "°F");
                table1.append(createTableRow2);
                createTableRow2.append("Wind: " + tableWeather1[i].windSpeed + " MPH");
                createTableRow2.append(createTableRow3);
                createTableRow3.append("Humidity: " + tableWeather1[i].humidity + "%");
            }
            localStorage.clear;
        })
};



