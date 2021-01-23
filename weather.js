const weatehr = document.querySelector(".js-weather");

const API_KEY = "b7ca0c1e4a4a12d1941279bd2987b462";
const COORDS = "coords";

function getWeather(let, lng)
{
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${let}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weatehr.innerText = `${temp}˚ ${place}`;
    });
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSucces(postion){
    const latitude = postion.coords.latitude;
    const longitude = postion.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude,longitude);

}

function handGeoError(){
console.log("cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handGeoError)
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS)

    if(loadedCords === null){
        askForCoords();
    }

    else{
        const parsedCoords = JSON.parse(loadedCords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();