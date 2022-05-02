var cityInput = document.getElementById("citySearch")
var searchCity = document.getElementById("searchCity");
var btnDiv = document.getElementById("buttons");
var weatherApiKey= "7278fe6cd6efb81bde0820315e1bda68" 
var cityEl = document.getElementById("city");

if(localStorage.getItem("cityHistory")) {
    var cityArray = JSON.parse(localStorage.getItem("cityHistory"))
} else {
    var cityArray = [];
}
for (var i = 0; i < cityArray.length; i++) {
    var btn = document.createElement("button");
    btn.innerText = cityArray[i];
    btn.value = cityArray[i];
    btn.addEventListener("click", search);
    btnDiv.appendChild(btn);   
}

searchCity.addEventListener("click", search);

function search(event) {
    if(event.target.id == "searchCity") {
        var city = cityInput.value;
        weatherInfo(city);
        cityInput.value = "";
    } else {
        weatherInfo(event.target.value);
    }
    
}

function weatherInfo(city) {
    console.log(city);
    cityEl.innerText = city;
    if(!cityArray.includes(city)) {
        cityArray.push(city)
        localStorage.setItem("cityHistory", JSON.stringify(cityArray));
        var btn = document.createElement("button");
        btn.innerText = city;
        btn.value = city
        btn.addEventListener("click", search)
        btnDiv.appendChild(btn);   
    }

    

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
            var iconUrl = `https://openweathermap.org/img/w/${weatherData[i].weather[0].icon}.png`;
            
            var img = document.getElementById(`icon${i + 1}`);
            img.src = iconUrl;

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