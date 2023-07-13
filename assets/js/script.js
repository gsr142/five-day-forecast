$(document).ready(function() {
    
    
    
    
    

    // var weatherCall = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=d9603dd48b308569c2d9d4504c34811f";

    



   $(".submit").click(function(){
        getCity()
   });

   function addLonLat(data) {
    var weatherCall = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat="+data[0].lat+"&lon="+data[0].lon+"&appid=d9603dd48b308569c2d9d4504c34811f";
    fetch(weatherCall)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
        })

   }





   function getCity(){
    var userInput = $('.userInput').val();
    userInput = userInput.replace(/ /g, '_')
    console.log(userInput)
    var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q="+userInput+"&limit=10&appid=d9603dd48b308569c2d9d4504c34811f";
    console.log(geoCode)
    fetch(geoCode)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            console.log(data[0].lon)
            console.log(data[0].lat)
            console.log(data)
            addLonLat(data)
        });
    
    
   }


    
    
});