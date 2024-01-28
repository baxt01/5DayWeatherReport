var API = "0faefdf2ca0e5811213ef3ffb85306f1";

// set the onclick function.
$('#search-button').on('click', function (e) {
    // prevent the default browser behavior.
    event.preventDefault();

    // Here we are building the URL we need to query the database
    var geoQueryURL = "http://api.openweathermap.org/geo/1.0/direct?";
    
    // get the user's inputted location.
    var location = $('#search-input').val();

    var geoQueryurlq = geoQueryURL + 'q=' + location + '&limit=5&appid=' + API;
    console.log(geoQueryurlq);


    // Here we run our Fetch call to the OpenWeatherMap geolocation API
    fetch(geoQueryurlq)
    .then(function (response) {
        // Calling .json() to access the json data stored inside the returned promise
        return response.json();
    })
    // We store all of the retrieved data inside of an object called "data"
    .then(function (data) {

        // Log the resulting object
        console.log(data);

        // retrieving the LAt & lon coordinates from the geolocation on open weather map.
        var lat = data[0].lat;
        console.log(lat);
        var lon = data[0].lon;
        console.log(lon);

        // base URL for the weather call.
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?';

        // building the URL for the api call.
        var queryurlq = `${queryURL}lat=${lat}&lon=${lon}&appid=${API}`;
        // logging the URL to the console.
        console.log(queryurlq);
        // Here we run the fetch call to the open weather API.
        fetch(queryurlq)
        .then(function(res){
            // calling the .json()to access the json data stored inside the returned promise.
            return res.json();
        })
        .then(function(data){
            // logging the stored data inside the data object.
            console.log(data);

        })

    })

})




