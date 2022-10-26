//API key: 2267b4a420916efb37557a9a7deb5854
var search = document.querySelector('#search'); //Search area card
var searchCity = document.querySelector('#searchCity'); //Input field for city search
var citySearchTerm = document.querySelector('#city-search-term'); //Span that shows what city was searched
var displayContainerEl = document.querySelector('#forecast-container'); //Display container for 5 day forecast
var todayDisplayContainerEl = document.querySelector('#weather-container'); //Display container for current day weather
var history = document.querySelector('#search-history'); //Search history card
var storageList = ['past search-1','past search-2','past search-3','past search-4','past search-5']; //storage array for local search history
var sh1 = document.querySelector('#sh1');
var sh2 = document.querySelector('#sh2');
var sh3 = document.querySelector('#sh3');
var sh4 = document.querySelector('#sh4');
var sh5 = document.querySelector('#sh5');

//Submits search
var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = searchCity.value.trim();
  
    if (cityName !== '') {
      getLocalForecast(cityName);
      addToLocal(cityName);
  
      displayContainerEl.textContent = '';
      searchCity.value = '';
    } 
};

//Adds searched city to local storage and displays on main page
var addToLocal = function (cityName){
  storageList.pop();
  storageList.unshift(cityName);

  localStorage.setItem('sh1',storageList[0]);
  localStorage.setItem('sh2',storageList[1]);
  localStorage.setItem('sh3',storageList[2]);
  localStorage.setItem('sh4',storageList[3]);
  localStorage.setItem('sh5',storageList[4]);
}

//Displays local storage to search history area
var displayHistory = function (list){
  sh1.innerHTML = localStorage.getItem('sh1');
  sh2.innerHTML = localStorage.getItem('sh2');
  sh3.innerHTML = localStorage.getItem('sh3');
  sh4.innerHTML = localStorage.getItem('sh4');
  sh5.innerHTML = localStorage.getItem('sh5');
  console.log(list);

}

//Gets 5 day forecast 
var getLocalForecast = function (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&limit=1&appid=2267b4a420916efb37557a9a7deb5854&units=imperial';

    console.log(city);
  
    //Fetches API data by city name and uses that to get 5 day forecast and coordinates to use to call current weather
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
             console.log('API data')
             console.log(data);
             var cityLat = data.city.coord.lat;
             var cityLon = data.city.coord.lon;
             console.log(cityLat,cityLon);
             var singleDayUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&appid=2267b4a420916efb37557a9a7deb5854&units=imperial';
             
             //Displays all data for 5 day forecast
             citySearchTerm.textContent = data.city.name;
             for(var i=0; i < data.list.length; i += 8){
                var title = document.createElement('h2');
                var singleDay = document.createElement('p');
                var icon = document.createElement('img');
                var singleDayTemp = document.createElement('p');
                var singleDayHum = document.createElement('p');
                var singleDayWS = document.createElement('p');
                displayContainerEl.appendChild(title);
                displayContainerEl.appendChild(singleDay);
                displayContainerEl.appendChild(icon);
                displayContainerEl.appendChild(singleDayTemp);
                displayContainerEl.appendChild(singleDayHum);
                displayContainerEl.appendChild(singleDayWS);
                title.innerHTML = data.list[i].dt_txt.substr(5,5); //Trims date to look more astetically pleasing
                icon.src = 'https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
                singleDay.innerHTML = data.list[i].weather[0].description;
                singleDayTemp.innerHTML = 'Temperature: ' + data.list[i].main.temp + ' F';
                singleDayHum.innerHTML = 'Humidity: ' + data.list[i].main.humidity + ' %';
                singleDayWS.innerHTML = 'Wind Speed: ' + data.list[i].wind.speed + ' mph';
                console.log(data.list[i].weather[0].description);
             }

             //Retruns information for current weather
            fetch(singleDayUrl)
             .then(function (response) {
                 return response.json();
             })
             .then(function (data) {
              var title = document.createElement('h2');
              var singleDay = document.createElement('p');
              var icon = document.createElement('img');
              var singleDayTemp = document.createElement('p');
              var singleDayHum = document.createElement('p');
              var singleDayWS = document.createElement('p');
              todayDisplayContainerEl.appendChild(title);
              todayDisplayContainerEl.appendChild(singleDay);
              todayDisplayContainerEl.appendChild(icon);
              todayDisplayContainerEl.appendChild(singleDayTemp);
              todayDisplayContainerEl.appendChild(singleDayHum);
              todayDisplayContainerEl.appendChild(singleDayWS);
              title.innerHTML = 'Today';
              icon.src = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
              singleDay.innerHTML = data.weather[0].description;
              singleDayTemp.innerHTML = 'Temperature: ' + data.main.temp + ' F';
              singleDayHum.innerHTML = 'Humidity: ' + data.main.humidity + ' %';
              singleDayWS.innerHTML = 'Wind Speed: ' + data.wind.speed + ' mph';
              console.log(data);
             })
        })
        .catch(function (error) {
          alert('Please enter a valid city name');
        });
};

displayHistory(storageList);
search.addEventListener("click", formSubmitHandler);