var weatherKey = "3c71aebffae52dc748aa0c2b474d8d34";
var limit = 1;




  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${weatherKey}`;
  var response = await fetch(url);
  var cityData = await response.json();
  var cityLat = cityData[0]["lat"];
  var cityLon = cityData[0]["lon"];
  
  document.getElementById("forecast-main-container").innerHTML = "";
  await populateCurrentDayWeather(city, cityLat, cityLon);
  await populateForecast(city, cityLat, cityLon);
  console.log(localStorage);
  




  var urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${weatherKey}`;
  var response2 = await fetch(urlWeather);
  var data = await response2.json();
  var currentDay = moment().format("MM/DD/YYYY");
  $("#current-city").text(city + " (" + currentDay + ")");
  $("#current-temp").text("Temp: " + kelvinToF(data["current"]["temp"]) + " F");
  $("#current-wind").text("Wind: " + data["current"]["wind_speed"] + " MPH");
  $("#current-humidity").text("Humidty: " + data["current"]["humidity"] + " %");
  $("#current-uv").text("UV Index: " + data["current"]["uvi"]);


