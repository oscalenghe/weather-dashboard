var apiKey = "26554d07776928bf078f6e60f3c5c2b7";
var searchFormEl = document.getElementById('search-box');

// IDs for current weather
var cityName = document.getElementById('current-city');
var todaysDate = document.getElementById('current-date');
var todaysTemp = document.getElementById('temperature'); 
var todaysHumidity = document.getElementById('humidity');
var todaysWind = document.getElementById('wind-speed');


// IDs for 5-day forecast
var fDate1 = document.getElementById('fDate1');
var fImg1 = document.getElementById('fImg1');
var fTemp1 = document.getElementById('fTemp1'); 
var fWind1 = document.getElementById('fWind1');
var fHumidity1 = document.getElementById('fHumidity1');

var fDate2 = document.getElementById('fDate2');
var fImg2 = document.getElementById('fImg2');
var fTemp2 = document.getElementById('fTemp2'); 
var fWind2 = document.getElementById('fWind2');
var fHumidity2 = document.getElementById('fHumidity2');

var fDate3 = document.getElementById('fDate3');
var fImg3 = document.getElementById('fImg3');
var fTemp3 = document.getElementById('fTemp3'); 
var fWind3 = document.getElementById('fWind3');
var fHumidity3 = document.getElementById('fHumidity3');

var fDate4 = document.getElementById('fDate4');
var fImg4 = document.getElementById('fImg4');
var fTemp4 = document.getElementById('fTemp4'); 
var fWind4 = document.getElementById('fWind4');
var fHumidity4 = document.getElementById('fHumidity4');

var fDate5 = document.getElementById('fDate5');
var fImg5 = document.getElementById('fImg5');
var fTemp5 = document.getElementById('fTemp5'); 
var fWind5 = document.getElementById('fWind5');
var fHumidity5 = document.getElementById('fHumidity5');

//day.js data
todaysDate.textContent = dayjs().format('MMM D YYYY');
fDate1.textContent = dayjs().add(1, 'Day').format('M/DD/YYYY');
fDate2.textContent = dayjs().add(2, 'Day').format('M/DD/YYYY');
fDate3.textContent = dayjs().add(3, 'Day').format('M/DD/YYYY');
fDate4.textContent = dayjs().add(4, 'Day').format('M/DD/YYYY');
fDate5.textContent = dayjs().add(5, 'Day').format('M/DD/YYYY');


//this handles the form submission
function handleSearchFormSubmit(event) {
    event.preventDefault();
    var city = document.getElementById('search-city').value;
    if (city == '') {
      return;
    }
    getWeatherData(city);
  } 
  searchFormEl.addEventListener('click', handleSearchFormSubmit);
  
  
  //retrieves OpenWeatherAPI data
  function getWeatherData(city) {
    var latLongURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;
  
    fetch(latLongURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (latLong) {
      lat = latLong[0].lat;
      lon = latLong[0].lon;
      var cityWeatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;
      return fetch(cityWeatherURL);
    })
    .then(function(response) { 
      return response.json(); 
    })
    .then(function(cityWeather) {
      //checks to see if searchedCities array already includes newly searched city. If its not already there it is added and the updated array is saved to local storage.
      if (searchedCities.includes(cityWeather.city.name) == false) {
        searchedCities.push(cityWeather.city.name);
        localStorage.setItem('city', JSON.stringify(searchedCities));
      }
      
      //puts OpenWeatherAPI data on page
      cityName.textContent = " " + cityWeather.city.name;
      todaysTemp.textContent = " " + cityWeather.list[0].main.temp + " °F";
      todaysWind.textContent = " " + cityWeather.list[0].wind.speed + " MPH";
      todaysHumidity.textContent = " " + cityWeather.list[0].main.humidity + " %";
  
      fImg1.src = 'https://openweathermap.org/img/wn/' + cityWeather.list[7].weather[0].icon + '@2x.png';
      fTemp1.textContent = " " + cityWeather.list[7].main.temp + " °F";
      fWind1.textContent = " " + cityWeather.list[7].wind.speed + " MPH";
      fHumidity1.textContent = " " + cityWeather.list[7].main.humidity + " %";
  
      fImg2.src = 'https://openweathermap.org/img/wn/' + cityWeather.list[15].weather[0].icon + '@2x.png';
      fTemp2.textContent = " " + cityWeather.list[15].main.temp + " °F";
      fWind2.textContent = " " + cityWeather.list[15].wind.speed + " MPH";
      fHumidity2.textContent = " " + cityWeather.list[15].main.humidity + " %";
  
      fImg3.src = 'https://openweathermap.org/img/wn/' + cityWeather.list[23].weather[0].icon + '@2x.png';
      fTemp3.textContent = " " + cityWeather.list[23].main.temp + " °F";
      fWind3.textContent = " " + cityWeather.list[23].wind.speed + " MPH";
      fHumidity3.textContent = " " + cityWeather.list[23].main.humidity + " %";
  
      fImg4.src = 'https://openweathermap.org/img/wn/' + cityWeather.list[31].weather[0].icon + '@2x.png';
      fTemp4.textContent = " " + cityWeather.list[31].main.temp + " °F";
      fWind4.textContent = " " + cityWeather.list[31].wind.speed + " MPH";
      fHumidity4.textContent = " " + cityWeather.list[31].main.humidity + " %";
  
      fImg5.src = 'https://openweathermap.org/img/wn/' + cityWeather.list[39].weather[0].icon + '@2x.png';
      fTemp5.textContent = " " + cityWeather.list[39].main.temp + " °F";
      fWind5.textContent = " " + cityWeather.list[39].wind.speed + " MPH";
      fHumidity5.textContent = " " + cityWeather.list[39].main.humidity + " %";
  
      console.log(cityWeather)
      console.log(cityWeather.city.name)
      renderSearchButtons();
    })
  }
  
  //retrieves searchedCities array from local storage
  var searchedCities = localStorage.getItem('city');
  if (!searchedCities) {
    searchedCities = [];
  } else {
    searchedCities = JSON.parse(searchedCities);
  }
  
  
  //renders new search buttons with eventListeners to page based on length of searchedCities array
  function renderSearchButtons() {
    document.getElementById('searched-cities').innerHTML = '';
    
    for (let i = 0; i < searchedCities.length; i++) { 
      var newSearchButton = document.createElement('button');
      newSearchButton.textContent = searchedCities[i];
      newSearchButton.classList.add('button');
      newSearchButton.addEventListener("click", function(){
        city = searchedCities[i];
        
        getWeatherData(city);
      });
      document.getElementById('searched-cities').appendChild(newSearchButton)
    }
  }
  
  renderSearchButtons();