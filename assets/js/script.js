$(document).ready(function() {
    
    var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=d9603dd48b308569c2d9d4504c34811f";

    var weatherCall = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=d9603dd48b308569c2d9d4504c34811f";

    



   $(".submit").click(function(){
    var userInput = $('.userInput').val();
    console.log(userInput)
   });
    
    
});