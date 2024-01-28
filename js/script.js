var API = "0faefdf2ca0e5811213ef3ffb85306f1";
var iconurl = 'https://openweathermap.org/img/w/';

// set the onclick function.
$('#search-button').on('click', function (e) {
    // prevent the default browser behavior.
    event.preventDefault();

    // Here we are building the URL we need to query the database
    var geoQueryURL = "http://api.openweathermap.org/geo/1.0/direct?";
    
    // get the user's inputted location.
    var location = $('#search-input').val();

    var geoQueryurlq = geoQueryURL + 'q=' + location + '&limit=5&appid=' + API;
    var date = dayjs().format('DD-MM-YYYY');

    // Here we run our Fetch call to the OpenWeatherMap geolocation API
    fetch(geoQueryurlq)
    .then(function (response) {
        // Calling .json() to access the json data stored inside the returned promise
        return response.json();
    })
    // We store all of the retrieved data inside of an object called "data"
    .then(function (data) {

        // retrieving the LAt & lon coordinates from the geolocation on open weather map.
        var lat = data[0].lat;
        var lon = data[0].lon;

        // base URL for the weather call.
         var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?';
        
        // building the URL for the api call.
        var queryurlq = `${queryURL}lat=${lat}&lon=${lon}&appid=${API}&units=metric`;

        // Here we run the fetch call to the open weather API.
        fetch(queryurlq)
        .then(function(res){
            // calling the .json()to access the json data stored inside the returned promise.
            return res.json();
        })
        .then(function(data){
            // putting the current weather icon on the page.
            ''
            var iconCode = data.list[0].weather[0].icon;
            var icon = `${iconurl}${iconCode}`;
            console.log(data);  
            var city = data.city.name;
            var temp = data.list[0].main.temp;
            var wind = data.list[0].wind.speed;
            var humidity = data.list[0].main.humidity;
            
            // adding the wether for Today onto the page.
            $('#today').html(`<h1>${city} ${date}<img src=${icon}.png></h1> <br> 
            <p>Temp: ${temp}°c <br>
             Wind: ${wind}MPH <br>
             Humidity: ${humidity}% </p>`);

             //creating the buttons for history.
             
        
        })

    })

})




