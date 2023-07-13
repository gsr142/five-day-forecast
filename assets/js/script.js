$(document).ready(function() {
    
    var weatherCurrent = $('.display-weather');
    
    var apiKey = "d9603dd48b308569c2d9d4504c34811f"
    

   $(".submit").click(function(){
        $('.display-weather').empty();
        getCity();
   });

   function addLonLat(data) {
    var weatherCall = "https:api.openweathermap.org/data/2.5/weather?lat="+data[0].lat+"&lon="+data[0].lon+"&appid="+apiKey+"&units=imperial";
    //calls weather API using fetch with longitude and latitude returned from geocode API
    fetch(weatherCall)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //console.log(data)
            //returns and displays current temp
            var currentTemp = $("<h4>")
            $(currentTemp).text("Temperature: " + data.main.temp + "F");
            weatherCurrent.append(currentTemp);
            
            //returns and displays humidity
            var currentHum = $("<h4>")
            $(currentHum).text("Humidity: " + data.main.humidity + "%");
            weatherCurrent.append(currentHum);
            
            //returns and displays wind
            var currentWind = $("<h4>");
            $(currentWind).text("Wind: " + data. wind.speed + "mph");
            weatherCurrent.append(currentWind)
            
        })

   }
   //Function takes user input and calls on geocode api using fetch to get latitude and longitude, so that weather API can be properly called. 
   function getCity(){
    var userInput = $('.userInput').val();
    userInput = userInput.replace(/ /g, '_')
    var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q="+userInput+"&limit=10&appid="+apiKey;
    
    fetch(geoCode)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            // console.log(data[0].lon)
            // console.log(data[0].lat)
            console.log(data)
            var displayCurrent = $("<h3>");
            //displays headline showing the Location selected by the user
            $(displayCurrent).text("Current weather for " + data[0].name);
            weatherCurrent.append(displayCurrent);
            //calls addLonLat
            addLonLat(data)
        });
    
    
   }


    
    
});