$(document).ready(function() {
    
    var weatherCurrent = $('.display-weather');
    
    var apiKey = "d9603dd48b308569c2d9d4504c34811f"
    
    
    createButtons();
    //puts the history button text into the search bar so the user can recheck info.
    $('.historyButton').on('click', function(){
        var buttonText = $(this).text();
        $('.userInput').val(buttonText)
        
    })

    //triggers the api calls that will return the current weather and forecast data
   $(".submit").on('click', function(){
        $('.display-weather').empty();
        getCity();
        
   });

   function addLonLat(data) {
    //api call for current weather
    var weatherCall = "https://api.openweathermap.org/data/2.5/weather?lat="+data[0].lat+"&lon="+data[0].lon+"&appid="+apiKey+"&units=imperial";
    //calls weather API using fetch with longitude and latitude returned from geocode API
    fetch(weatherCall)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            
            //returns and displays current temp and conditions
            var iconCode = data.weather[0].icon
            var iconUrl = iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
            var iconElement = $('<img>');
            iconElement.attr('src', iconUrl);
            weatherCurrent.append(iconElement)

            var currentTemp = $("<h4>");
            $(currentTemp).text("Temperature: " + data.main.temp + "F");
            weatherCurrent.append(currentTemp);
            
            //returns and displays humidity
            var currentHum = $("<h4>");
            $(currentHum).text("Humidity: " + data.main.humidity + "%");
            weatherCurrent.append(currentHum);
            
            //returns and displays wind
            var currentWind = $("<h4>");
            $(currentWind).text("Wind: " + data. wind.speed + "mph");
            weatherCurrent.append(currentWind);
            
        })
    //api call for forecast
    var forecastCall = "https://api.openweathermap.org/data/2.5/forecast?lat="+data[0].lat+"&lon="+data[0].lon+"&appid="+apiKey+"&units=imperial"
    fetch(forecastCall)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //This section dynamically adds forecast info to a forecast card, and appends the cards to the page.
            for (i = 0; i < data.list.length; i++){
                if (data.list[i].dt_txt.endsWith("15:00:00")){
                    
                    var forecastRow = $("<div>")
                    forecastRow.addClass("row")
                    var forecastCard = $("<div>");
                    forecastCard.addClass("col-12 bg-info mb-1 text-light");
                    var date = $('<div>')
                    date.addClass('col-12')
                    date.text(data.list[i].dt_txt.split(' ')[0])
                    forecastCard.append(date)

                    var temp = $('<div>')
                    temp.addClass('col-12')
                    temp.text("Temperature: " + data.list[i].main.temp)
                    forecastCard.append(temp)
                    //console.log(data.list[i].weather[0].icon)
                    var iconCode = data.list[i].weather[0].icon
                    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png"
                    var iconElement = $('<img>');
                    iconElement.attr('src', iconUrl);
                    forecastCard.append(iconElement);

                    var humidity = $('<div>')
                    humidity.addClass('col-12')
                    humidity.text("Humidity: " + data.list[i].main.humidity + "%")
                    forecastCard.append(humidity)

                    var wind = $('<div>')
                    wind.addClass('col-12 mb-2')
                    wind.text("Wind: " + data.list[i].wind.speed + "mph")
                    forecastCard.append(wind)


                    
                    forecastRow.append(forecastCard)
                    weatherCurrent.append(forecastRow);
                }
            }
        })


   }
   //Function takes user input and calls on geocode api using fetch to get latitude and longitude, so that weather API can be properly called. 
   function getCity(){
    var userInput = $('.userInput').val();
    userInput = userInput.replace(/ /g, '_')
    var geoCode = "https://api.openweathermap.org/geo/1.0/direct?q="+userInput+"&limit=10&appid="+apiKey;
    
    fetch(geoCode)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
           
            var displayCurrent = $("<h3>");
            //displays headline showing the Location selected by the user
            $(displayCurrent).text("Current weather for " + data[0].name);
            weatherCurrent.append(displayCurrent);
            //calls addLonLat
            addLonLat(data)
        });

    var searchHistory = localStorage.getItem('searchHistory');
    var itemsArray = searchHistory ? JSON.parse(searchHistory) : [];

    itemsArray.push(userInput);

    localStorage.setItem('searchHistory', JSON.stringify(itemsArray));
    console.log(localStorage)
    createButtons()
   }
   //creates buttons from the search history stored in local storage, and adds them to the page. Sorts by most recent, and only produces a max of 5 buttons
   function createButtons(){
    var buttonContainer = $('#buttonContainer');
    buttonContainer.empty();
    var searchHistory = localStorage.getItem('searchHistory');
    var itemsArray = searchHistory ? JSON.parse(searchHistory) : [];
    
    for (let i = itemsArray.length-1; i >= itemsArray.length-5; i--){
        var item = itemsArray[i].replace("_", " ");
        if (itemsArray[i].length > 1){
            var button = $('<button>');
            button.addClass('col-12 m-1 historyButton');
            button.text(item);
            buttonContainer.append(button);
        }

        
    }
   }


    
    
});