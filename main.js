let url;
let urlForDay;
let city;
let date = new Date();
let weatherDate = document.querySelector('.weather-date');
let weatherCity = document.querySelector('.city');
let mainWeather = document.querySelector('.weather-main');
let cityTemperature = document.querySelector('.weather-temperature');
let cityClouds = document.querySelector('.weather-clouds');
let cityPressure = document.querySelector('.weather-pressure');
let cityHumidity = document.querySelector('.weather-humidity');
let cityWind = document.querySelector('.weather-wind');
let inputField = document.querySelector("#cityInput");
let locationBtn = document.querySelector("button");
let infoTxt = document.querySelector(".title");
let wIcon = document.querySelector("#mainImg");
let background = document.querySelector(".wrapper");

inputField.addEventListener("keyup", e => {
    if (inputField.value == "") {
        requestUrlEmpty(inputField.value = 'Kyiv');
    }

    else if (e.key == "Enter" && inputField.value != "") {
        requestUrl(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
});

function requestUrl(city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c66a3cb9711a499a96d3e8da4191ff2b`;
    urlForDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c66a3cb9711a499a96d3e8da4191ff2b`;
    fetchData();
    fetchDataForDays()
};

+function requestUrlEmpty(city = 'Kyiv') {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c66a3cb9711a499a96d3e8da4191ff2b`;
    urlForDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c66a3cb9711a499a96d3e8da4191ff2b`;
    fetchData();
    fetchDataForDays()
}();

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=c66a3cb9711a499a96d3e8da4191ff2b`;
    urlForDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=c66a3cb9711a499a96d3e8da4191ff2b`;
    fetchData();
    fetchDataForDays()
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.style.color = 'red';
}

function fetchData() {
    infoTxt.innerText = "Weather Forecast by Pronoza";
    infoTxt.style.color = 'blue';
    fetch(url).then(response => response.json()).then(result => weatherDetails(result)).catch(() => {
    });
}

function weatherDetails(responce) {
    if (responce.cod == "404") {
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
        infoTxt.style.color = 'red';
    } else {
        weatherCity.innerHTML = responce.name;
        mainWeather.innerHTML = responce.weather[0].main;
        // cityClouds.innerHTML = '<img src = http://openweathermap.org/img/wn/' + responce.weather[0]['icon'] + '@2x.png />';
        cityTemperature.innerHTML = Math.round(responce.main.temp) + '&#176' + 'C';
        cityPressure.innerHTML = responce.main.pressure + ' Pa';
        cityHumidity.innerHTML = responce.main.humidity + ' %';
        cityWind.innerHTML = responce.wind.speed + ' km/h';
        const { description, id } = responce.weather[0];

        if (id == 800) {
            background.style.backgroundImage = "url('clear.jpg')";
            // wIcon.src = "icons/clear.png";
        } else if (id >= 200 && id <= 232) { 
            background.style.backgroundImage = "url('storm.jpg')";
            // wIcon.src = "icons/storm.png";
        } else if (id >= 600 && id <= 622) {
            background.style.backgroundImage = "url('snow.jpg')";
            // wIcon.src = "icons/snow.png";
        } else if (id >= 701 && id <= 781) {
            background.style.backgroundImage = "url('mist.jpg')";
            // wIcon.src = "icons/haze.png";
        } else if (id >= 801 && id <= 804) {//"icon":"04d"
            background.style.backgroundImage = "url('clouds.jpg')";
            // wIcon.src = "icons/broken clouds.png"; 
        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            background.style.backgroundImage = "url('rain.jpg')";
            // wIcon.src = "icons/rain.png";
        }
    }
}


function fetchDataForDays() {

fetch(urlForDay)
.then(response => response.json())
.then(data => {


    for(i = 1; i<4; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°C";
    }

    for(i = 1; i<4; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(1) + "°C";
    }
    //------------------------------------------------------------

    //Getting Weather Icons
     for(i = 1; i<4; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    //------------------------------------------------------------
    console.log(data)
})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}

function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "Kyiv";
    fetchDataForDays();
    fetchData();
}

//Date
let day = date.getDay();
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thuesday', 'Friday', 'Saturday'];
let month = date.getMonth()
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
let year = date.getFullYear();
weatherDate.innerHTML = `${days[day]} ${months[month - 1]} ${year}`;

//anim text
// London
fetch("https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=c66a3cb9711a499a96d3e8da4191ff2b")
.then(responce => responce.json())
.then(function(responce){
document.getElementById('london_weather').innerHTML = Math.round(responce.main.feels_like) + '&#176' + 'C'+',';
});
// Berlin
fetch("https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=c66a3cb9711a499a96d3e8da4191ff2b")
.then(responce => responce.json())
.then(function(responce){
document.getElementById('berlin_weather').innerHTML = Math.round(responce.main.feels_like) + '&#176' + 'C'+',';
});
// Paris
fetch("https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=c66a3cb9711a499a96d3e8da4191ff2b")
.then(responce => responce.json())
.then(function(responce){
document.getElementById('paris_weather').innerHTML = Math.round(responce.main.feels_like) + '&#176' + 'C'+',';
});
// Washington
fetch("https://api.openweathermap.org/data/2.5/weather?q=Washington&units=metric&appid=c66a3cb9711a499a96d3e8da4191ff2b")
.then(responce => responce.json())
.then(function(responce){
document.getElementById('washington_weather').innerHTML = Math.round(responce.main.feels_like) + '&#176' + 'C' +'.';
});



function CheckDay(day){
    if(day + date.getDay() > 6){
        return day + date.getDay() - 7;
    }
    else{
        return day + date.getDay();
    }
}

    for(i = 1; i<4; i++){
        document.getElementById("day" + (i+1)).innerHTML = days[CheckDay(i)];
    }
