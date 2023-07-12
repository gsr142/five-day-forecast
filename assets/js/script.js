$(document).ready(function() {
    var userInput = $('.userInput').val();
    
    
    
    var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=10&appid=d9603dd48b308569c2d9d4504c34811f";

    var weatherCall = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=d9603dd48b308569c2d9d4504c34811f";

    



   $(".submit").click(function(){
        getCity()
   });

   function getCity(){
    console.log(userInput)
    console.log(geoCode)
    fetch(geoCode)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            console.log(data)
        })
   }


    
    
});