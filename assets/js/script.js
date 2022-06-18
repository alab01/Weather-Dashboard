var weatherKey = "3c71aebffae52dc748aa0c2b474d8d34";
var limit = 1;
localStorage.clear();



var searchBtn = document.getElementById("search-button");
searchBtn.addEventListener("click", async function () {
  var city = $("#city-input").val();
  if (city == null || city.trim() === "")
    return;
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${weatherKey}`;
  var response = await fetch(url);
 
  var cityData = await response.json();
  if (cityData == null || cityData.length == 0)
    return;
  console.log(cityData);
  var cityLat = cityData[0]["lat"];
  var cityLon = cityData[0]["lon"];
  
  document.getElementById("forecast-main-container").innerHTML = "";
  await populateCurrentDayWeather(city, cityLat, cityLon);
  await populateForecast(city, cityLat, cityLon);
  console.log(localStorage); 
  
  if (!localStorage.hasOwnProperty(city.trim().toLowerCase())) {
    var localStrVal = { lat: cityLat, lon: cityLon };
    localStorage.setItem(city.trim().toLowerCase(), JSON.stringify(localStrVal));
    var searchHistBtn = document.createElement("div");
    searchHistBtn.setAttribute("class", "searchHistBtn btn btn-info");
    $(searchHistBtn).text(city);
    searchHistBtn.addEventListener("click", searchHistBtnClicked);
    document.getElementById("recently-searched").appendChild(searchHistBtn);
    document.getElementById("recently-searched").appendChild(document.createElement("br"));
  }
  
});


async function searchHistBtnClicked(event) {
    var city = event.target.textContent;
    city = city.trim().toLowerCase();
    var cityLatLon = JSON.parse(localStorage.getItem(city));
    await populateCurrentDayWeather(city, cityLatLon["lat"], cityLatLon["lon"]);
    document.getElementById("forecast-main-container").innerHTML = "";
    await populateForecast(city, cityLatLon["lat"], cityLatLon["lon"]);

}
async function populateCurrentDayWeather(city, cityLat, cityLon) {
  var urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${weatherKey}`;
  var response2 = await fetch(urlWeather);
  var data = await response2.json();
  $(".current-city-container").css("border", "2px solid black");
  var currentDay = moment().format("MM/DD/YYYY");
  $("#current-city").text(city + " (" + currentDay + ")");
  $("#current-temp").text("Temp: " + kelvinToF(data["current"]["temp"]) + " F");
  $("#current-wind").text("Wind: " + data["current"]["wind_speed"] + " MPH");
  $("#current-humidity").text("Humidty: " + data["current"]["humidity"] + " %");
  $("#current-uv").text("UV Index: " + data["current"]["uvi"]);
}

async function populateForecast(city, cityLat, cityLon) {
  var urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${weatherKey}`;
  var response2 = await fetch(urlWeather);
  var data = await response2.json();
  var currentDay = moment().format("MM/DD/YYYY");
  var forecasts = data["daily"];
  $(".forecast-title").css("display", "block",);
  for (var i = 0; i < 5; i++) {
    var forecast = forecasts[i];
    var container = document.createElement("div");
    container.setAttribute("class", "forecast-container col-2");
    var dt = document.createElement("div");
    var img = document.createElement("img");
    var temp = document.createElement("div");
    var wind = document.createElement("div");
    var humidity = document.createElement("div");

    dt.setAttribute("class", "fr-dt");
    img.setAttribute("class", "fr-img");
    temp.setAttribute("class", "fr-temp");
    wind.setAttribute("class", "fr-wind");
    humidity.setAttribute("class", "fr-humidity");

    var nextDay = moment().add(i + 1, "d").format("MM/DD/YYYY");
    $(dt).text("(" + nextDay + ")");
    var imgSrc = forecast["weather"][0]["icon"];
    $(img).attr("src", "https://openweathermap.org/img/w/" + imgSrc + ".png");
    $(temp).text(kelvinToF(forecast["temp"]["day"]) + " F");
    $(wind).text(forecast["wind_speed"] + " MPH");
    $(humidity).text(forecast["humidity"] + " %");

    container.appendChild(dt);
    container.appendChild(img);
    container.appendChild(temp);
    container.appendChild(wind);
    container.appendChild(humidity);

    document.getElementById("forecast-main-container").appendChild(container);
  }
}

function kelvinToF(kelvin){
    kelvin = parseFloat(kelvin);
    return Math.floor(((kelvin - 273.15) * 1.8) + 32);
}
