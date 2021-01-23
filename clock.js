const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector("h1");


function getTIme(){
    const date = new Date();
    const minites = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minites < 10 ? `0${minites}` : minites}:${seconds < 10 ? `0${seconds}` : seconds}`;

}

function init()
{
    getTIme()
    setInterval(getTIme,1000);
}

init();