const APIKey = "2407265d623bf7d962c05a67c5a0fc7d";
var link = "api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=" + APIKey;
var searchBar = document.getElementById('searchBar');
var searchButton = document.getElementById('searchButton');

// need a function to gather search input for user and save to local storage
searchButton.addEventListener('click', function() {
    if (searchBar.value) {
        localStorage.setItem("city", searchBar.value);
    } else {
        alert("Please enter a City name")
    }
})

// need a function to take search input and make a call
// function needs to get input and give lat/lon data
