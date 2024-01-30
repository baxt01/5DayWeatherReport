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
$('#search-button').on('click', function start (e) {
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
            console.log(data);
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
            $('#history').append(historicalSearch).click(function (e) {
                start(e);
            });
           
            // Building the forward forecast.
            x =  [7, 15, 23, 31, 39]

                var iconCode = data.list[7].weather[0].icon;
                var icon1 = `${iconurl}${iconCode}`;
                var city1 = data.city.name;
                var temp1 = data.list[7].main.temp;
                var wind1 = data.list[7].wind.speed;
                var humidity1 = data.list[7].main.humidity;
                
                var iconCode = data.list[15].weather[0].icon;
                var icon2 = `${iconurl}${iconCode}`;
                var city2 = data.city.name;
                var temp2 = data.list[15].main.temp;
                var wind2 = data.list[15].wind.speed;
                var humidity2 = data.list[15].main.humidity;
                
                var iconCode = data.list[23].weather[0].icon;
                var icon3 = `${iconurl}${iconCode}`;
                var city3 = data.city.name;
                var temp3 = data.list[23].main.temp;
                var wind3 = data.list[23].wind.speed;
                var humidity3 = data.list[23].main.humidity;
                
                var iconCode = data.list[31].weather[0].icon;
                var icon4 = `${iconurl}${iconCode}`;
                var city4 = data.city.name;
                var temp4 = data.list[31].main.temp;
                var wind4 = data.list[31].wind.speed;
                var humidity4 = data.list[31].main.humidity;
                
                var iconCode = data.list[39].weather[0].icon;
                var icon5 = `${iconurl}${iconCode}`;
                var city5 = data.city.name;
                var temp5 = data.list[39].main.temp;
                var wind5 = data.list[39].wind.speed;
                var humidity5 = data.list[39].main.humidity;
                

                 $('#forecast').html(`<p>5 day Forecast:</><br>
                 <div class="card bg-dark text-light me-3" style="width: 10rem">
                 <div class="card-body">
                 <h5 class="card-title">${dayjs().add(1, "day").format("DD-MM-YYYY")}</h5>
                 <img src="${icon1}.png">
                 <div class="card-text"> Temp: ${temp1}°c<br>
                 Wind: ${wind1}MPH<br>
                 Humidity: ${humidity1}%
                 </div>
                 </div>
                 </div><br>
                 <div class="card bg-dark text-light me-3" style="width: 10rem">
                 <div class="card-body">
                 <h5 class="card-title">${dayjs().add(2, "day").format("DD-MM-YYYY")}</h5>
                 <img src="${icon2}.png">
                 <div class="card-text"> Temp: ${temp2}°c<br>
                 Wind: ${wind2}MPH<br>
                 Humidity: ${humidity2}%
                 </div>
                 </div>
                 </div><br>
                 <div class="card bg-dark text-light me-3" style="width: 10rem">
                 <div class="card-body">
                 <h5 class="card-title">${dayjs().add(3, "day").format("DD-MM-YYYY")}</h5>
                 <img src="${icon3}.png">
                 <div class="card-text"> Temp: ${temp3}°c<br>
                 Wind: ${wind3}MPH<br>
                 Humidity: ${humidity3}%
                 </div>
                 </div>
                 </div><br>
                 <div class="card bg-dark text-light me-3" style="width: 10rem">
                 <div class="card-body">
                 <h5 class="card-title">${dayjs().add(4, "day").format("DD-MM-YYYY")}</h5>
                 <img src="${icon4}.png">
                 <div class="card-text"> Temp: ${temp4}°c<br>
                 Wind: ${wind4}MPH<br>
                 Humidity: ${humidity4}%
                 </div>
                 </div>
                 </div><br>
                 <div class="card bg-dark text-light me-3" style="width: 10rem">
                 <div class="card-body">
                 <h5 class="card-title">${dayjs().add(5, "day").format("DD-MM-YYYY")}</h5>
                 <img src="${icon5}.png">
                 <div class="card-text"> Temp: ${temp5}°c<br>
                 Wind: ${wind5}MPH<br>
                 Humidity: ${humidity5}%
                 </div>
                 </div>
                 </div><br>
                 `)
                 
        })
        
    })
    
})

                

