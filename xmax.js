const clockContainer = document.querySelector(".js-clock"),
     clockTitle = clockContainer.querySelector("h1");


function getTIme(){
    const xmasDay = new Date("2021-12-24:00:00:00+0900"),
    currentDay = new Date()

    const MilisecondDday = (xmasDay-currentDay+32400000);
    const ddayDay = MilisecondDday / (1000*60*60*24)
    const ddayHours = MilisecondDday / (1000*60*60) % 24
    const ddayMinuts = MilisecondDday / (1000*60) % 60
    const ddaySeconds = MilisecondDday / (1000) % 60


    clockTitle.innerText = `${ddayDay.toFixed()}d ${ddayHours < 9 ? `0${ddayHours.toFixed()}h` : `${ddayHours.toFixed()}h`} ${ddayMinuts < 9 ? `0${ddayMinuts.toFixed()}m` : `${ddayMinuts.toFixed()}m`} ${ddaySeconds < 9 ? `0${ddaySeconds.toFixed()}s` : `${ddaySeconds.toFixed()}s`}`;
    
}

function init()
{
    getTIme();
    setInterval(getTIme,1000);
}

init();

  
