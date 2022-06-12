const api = {
    endpoint: "http://api.weatherstack.com/current",
    key: "8fc27f23842201cee70d7dd88fc8c0fa"
}

const input = document.querySelector ("#input");

input.addEventListener ("keydown", enter);


function enter (e) {
    if(e.keyCode === 13) {
        getInfo (input.value);
    }
}

async function getInfo (data) {
    const res = await fetch (`${api.endpoint}?access_key=${api.key}&units=m&query=${data}`);
    const result = await res.json();
    displayResult(result);
}

function displayResult(result) {
    let city = document.querySelector ("#city");
    city.textContent = `${result.location.name}`;

    let country = document.querySelector ("#country");
    country.textContent = `${result.location.country}`;

    getOurDate(); 

    let temp = document.querySelector ("#temp");
    temp.innerHTML = `${Math.round(result.current.temperature)}<span>°</span>`;

    let feelsLike = document.querySelector ("#feelsLike");
    feelsLike.innerHTML = `${Math.round(result.current.feelslike)}<span>°</span>`;

    let conditions = document.querySelector ("#conditions");
    conditions.textContent = `${result.current.weather_descriptions[0]}`;
}

function getOurDate() {
    const myDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[myDate.getDay()];
    let todayDate = myDate.getDate();
    let month = months[myDate.getMonth()];
    let year = myDate.getFullYear();

    let showDate = document.querySelector("#date");
    showDate.textContent = `${day}` + " " + `${todayDate}` + " " + `${month}` + " " + `${year}`;
}
