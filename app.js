// weather.fetchWeather("tokyo");

let weather = {
    apiKey: 'cc099fec4d30b6908f70848bd8248257',
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=metric&appid="+this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather:function (data) {
        const { name } = data;
        const { lon, lat } = data.coord;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, temp_min, temp_max } = data.main;
        console.log(name, icon, description, temp, feels_like, temp_min, temp_max, data.dt);

        const cityName = document.querySelector(".city");
        cityName.innerHTML = name;
        document.getElementById("icon").setAttribute('src', "https://openweathermap.org/img/wn/" + icon + "@2x.png");
            // "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector('#description').innerHTML = description;
        document.getElementById('temp').innerHTML = temp;
        document.getElementById('feels-like').innerHTML = feels_like;
        document.getElementById('temp-min').innerHTML = temp_min;
        document.getElementById('temp-max').innerHTML = temp_max;
        document.getElementById('g_location').innerHTML = "Log " + lon + " Lat " + lat;
        // C_date.innerHTML = data.dt;
        let unixTimeStamp =data.dt;
        let date = new Date(unixTimeStamp * 1000);
        let R_date = date.toLocaleDateString("en-US");
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var formattedTime = hours + ' : ' + minutes;
        console.log(formattedTime);
        document.getElementById('R_date').innerHTML = R_date;
        document.getElementById('R_time').innerHTML = formattedTime;
    },
    search:function(){
        this.fetchWeather(document.querySelector('.form-control').value);
    },
    dropSearch:function(i){
        // console.log(document.querySelector('.drop_location').value);
        this.fetchWeather(document.querySelectorAll('.drop_location')[i].value);
        // for(let i = 0; i<6; i++){
        //     this.fetchWeather(document.querySelectorAll('.drop_location')[i].value);
        // }
    },
};

document.querySelector('#search-btn-id').addEventListener('click', function(e){
    e.preventDefault();
    weather.search();
});

for(let i = 0; i<6; i++){
    document.querySelectorAll('.drop_location')[i].
        addEventListener('click', (e)=>{
            e.preventDefault();
            weather.dropSearch(i);
        })
}

