var API = "0faefdf2ca0e5811213ef3ffb85306f1";
var iconurl = 'https://openweathermap.org/img/w/';

// Recover the local storage.
var recover = [];
var recovery = localStorage.getItem('city');
parsedRecovery = JSON.parse(recovery);
if (!parsedRecovery) {
    console.log('empty');
} else {
    //loop to get the history button on the page.
for (var i = 0; i < parsedRecovery.length - 1; i++) {
    var place = parsedRecovery[i];
    var historicalSearch = $('<button>');
    historicalSearch.addClass('btn btn-secondary mb-2');
    historicalSearch.attr('id', place);
    historicalSearch.text(place);
    $('#history').append(historicalSearch);
}
}


// set the onclick function.
$('#search-button').on('click', function (e) {
    // prevent the default browser behavior.
    e.preventDefault();

    // Here we are building the URL we need to query the database
    var geoQueryURL = "https://api.openweathermap.org/geo/1.0/direct?";
    
    // get the user's inputted location.
    var location = $('#search-input').val();

    // Building the geo location URL.
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
            // putting the current weather & icon on the page.
            var iconCode = data.list[0].weather[0].icon;
            var icon = `${iconurl}${iconCode}`;
            var city = data.city.name;
            var temp = data.list[0].main.temp;
            var wind = data.list[0].wind.speed;
            var humidity = data.list[0].main.humidity;
            
                    // push current city to the array in local storage.
                   recover.push(city);
                   var rec = recover.concat(parsedRecovery);
                   // Removing Duplicate entries so on refresh or re-visit there is only one of each location name. 
                   function removeDuplicates (rec) {
                    let unique = rec.reduce(function (acc, curr) {
                        if (!acc.includes(curr))
                        acc.push(curr);
                    return acc;
                    }, newRec = []);
                   }
                   removeDuplicates(rec);

                    //use JSON stringify to convert the array.
                    var saving = JSON.stringify(newRec);

                    // store the city name in local storage to recreate the history buttons.
                        localStorage.setItem('city', saving);

            // adding the wether for Today onto the page.
            $('#today').html(`<h1>${city} ${date}<img src=${icon}.png></h1> <br> 
            <p>Temp: ${temp}°c <br>
             Wind: ${wind}MPH <br>
             Humidity: ${humidity}% </p>`);
          
             //creating the buttons for history.
            var historicalSearch = $('<button>');
            historicalSearch.addClass('btn btn-secondary mb-2');
            historicalSearch.attr('data-name', city);
            historicalSearch.text(city);
            $('#history').append(historicalSearch);

            // Building the forward forecast.
        })
        
    })
    
})

                

