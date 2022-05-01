var cityInput = document.getElementById("citySearch")
var searchCity = document.getElementById("searchCity");
var weatherApiKey= "7278fe6cd6efb81bde0820315e1bda68" 

searchCity.addEventListener("click", weatherInfo);

function weatherInfo(event) {
    var city = cityInput.value;
    console.log(city)

    var apiOne = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${weatherApiKey}`;
    fetch(apiOne)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        console.log("lat" + lat + " lon" + lon);
        weatherInfoTwo(lat, lon);
    })
}
function weatherInfoTwo(lat, lon) {
    var apiTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;
    fetch(apiTwo)
    .then(function (res){
        return res.json();
    })
    .then(function(data) {
        console.log(data)
        var weatherData = data.daily;
        console.log(weatherData)

        for(let i = 0; i < 6; i++) {
            var temp = document.getElementById(`temp${i + 1}`);
            temp.innerText = weatherData[i].temp.max;
    

            var wind = document.getElementById(`wind${i + 1}`);
            wind.innerText = weatherData[i].wind_speed;
           

            var UVI = document.getElementById(`uvi${i + 1}`);
            UVI.innerText = weatherData[i].uvi;

            var humidity = document.getElementById(`humidity${i + 1}`);
            humidity.innerText = weatherData[i].humidity


        }
            
    

        
    })
}