var weatherKey = "3c71aebffae52dc748aa0c2b474d8d34";
//var city = "San Diego";
var limit = 1;
//var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${weatherKey}`;
var weatherData = ["temp", "humidity", "wind_speed", "uvi"];
var tempKey = "temp";
var humidityKey = "humidity";

https://api.openweathermap.org/data/2.5/onecall?lat=33.6856969&lon=-117.8259819&appid=3c71aebffae52dc748aa0c2b474d8d34


//https://api.openweathermap.org/geo/1.0/direct?q=irvine&limit=5&appid=3c71aebffae52dc748aa0c2b474d8d34

//"lat":33.6856969,"lon":-117.8259819


function getLatLongCity(city) {
    var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${weatherKey}`;
    fetch (url)
    .then(function(response) {
        return response.json();
    });
}

//var result = getLatLongCity("Irvine");
//console.log(result);



async function getLatLongForCity(city) {
    var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${weatherKey}`;
    var response = await fetch(url);
    var data = await response.json();
    return 
    //return {lat: data["lat"], lon: data["lon"]};
}

var latLon = await getLatLongForCity("irvine");
console.log(latLon);

