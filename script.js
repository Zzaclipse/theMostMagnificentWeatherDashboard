var startBtn = $("#search-button");
var cityInput = $("#city-input");
var historyBox = $("#history-box");
var locationTitle = $("#locationTitle");
var myWeatherAPIKey = "34010a9f11bb2f02977743a236eef58a";

var temp = $("#temp");
var wind = $("#wind");
var humid = $("#humid");
var uv = $("#uv");

var plus1Date = $("#plus1Date");
var plus1Icon = $("#plus1Icon");
var plus1Temp = $("#plus1Temp");
var plus1Wind = $("#plus1Wind");
var plus1Humid = $("#plus1Humid");

var plus2Date = $("#plus2Date");
var plus2Icon = $("#plus2Icon");
var plus2Temp = $("#plus2Temp");
var plus2Wind = $("#plus2Wind");
var plus2Humid = $("#plus2Humid");

var plus3Date = $("#plus3Date");
var plus3Icon = $("#plus3Icon");
var plus3Temp = $("#plus3Temp");
var plus3Wind = $("#plus3Wind");
var plus3Humid = $("#plus3Humid");

var plus4Date = $("#plus4Date");
var plus4Icon = $("#plus4Icon");
var plus4Temp = $("#plus4Temp");
var plus4Wind = $("#plus4Wind");
var plus4Humid = $("#plus4Humid");

var plus5Date = $("#plus5Date");
var plus5Icon = $("#plus5Icon");
var plus5Temp = $("#plus5Temp");
var plus5Wind = $("#plus5Wind");
var plus5Humid = $("#plus5Humid");

function getLocation(cityName) {
  var locUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    myWeatherAPIKey;

  fetch(locUrl).then(function (response) {
    response.json().then(function (data) {
      var cityLat = data.coord.lat;
      var cityLon = data.coord.lon;
      var weatherUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        cityLat +
        "&lon=" +
        cityLon +
        "&units=imperial" +
        "&appid=" +
        myWeatherAPIKey;

      fetch(weatherUrl).then(function (response) {
        response.json().then(function (data) {
          console.log(data);
          var icon0 = $(
            "<img src='http://openweathermap.org/img/wn/" +
              data.current.weather[0].icon +
              "@2x.png'>"
          );

          locationTitle.text(cityName + "    (" + moment().format("l") + ")");
          locationTitle.append(icon0);
          temp.text("Temp: " + data.current.temp + "°F");
          wind.text("Wind: " + data.current.wind_speed + " MPH");
          humid.text("Humidity: " + data.current.humidity + "%");
          uv.text("UV Index: " + data.current.uvi);

          for (var i = 1; i < 6; i++) {
            window["plus" + i + "Date"].text(
              moment.unix(data.daily[i].dt).format("l")
            );
            window["plus" + i + "Icon"]
              .empty()
              .append(
                $(
                  "<img src='http://openweathermap.org/img/wn/" +
                    data.daily[i].weather[0].icon +
                    "@2x.png'>"
                )
              );
            window["plus" + i + "Temp"].text(
              "Temp: " + data.daily[i].temp.day + "°F"
            );
            window["plus" + i + "Wind"].text(
              "Wind: " + data.daily[i].wind_speed + " MPH"
            );
            window["plus" + i + "Humid"].text(
              "Humidity: " + data.daily[i].humidity + "%"
            );
          }
        });
      });
    });
  });
}

function makeButton(cityName) {
  var newButton = $("<button></button>");
  newButton.text(cityName);
  newButton.attr("type", "button");
  newButton.addClass("btn");
  newButton.addClass("btn-secondary");
  historyBox.append(newButton);
}

function searchClick() {
  var cityS = cityInput.val();
  makeButton(cityS);
  getLocation(cityS);
}

function historyClick(event) {
  event.stopPropagation();
  var cityH = event.target.innerText;
  getLocation(cityH);
}

startBtn.on("click", searchClick);
historyBox.on("click", historyClick);
