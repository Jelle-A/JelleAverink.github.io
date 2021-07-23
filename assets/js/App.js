const api = {
    key: "dea27f6d2760d000e789cae29c486cd9",
    base: "https://api.openweathermap.org/data/2.5/"

}

const searchbox = document.querySelector('.search-container');
searchbox.addEventListener('keypress', setQuery);


const amsButton = document.querySelector('.ams').addEventListener("click", ams);

const LonButton = document.querySelector('.london').addEventListener("click", lon);

const MosButton = document.querySelector('.mos').addEventListener("click", mos);

const NYButton = document.querySelector('.ny').addEventListener("click", ny);

const TokButton = document.querySelector('.tokyo').addEventListener("click", tok);

const ParButton = document.querySelector('.paris').addEventListener("click", par);


const cloudMovies = ["The girl with the dragon tattoo", "Cloudy with a Chance of Meatballs", "Shutter Island", "The Dead", "Coraline", "The Matrix", "Harry Potter", "Fargo", "The Color Purple", "Twilight", "Prometheus", "Signs", "The Ghost", "Parasite", "From Dusk Till Down"];

const rainMovies = ["The Notebook", "Pulp Fiction", "Jurassic Park", "Shawshank Redemption", "Forrest Gump", "Parasite", "MegaMind", "The Dark Knight", "Ella Enchanted", "Mother", "The silence of the lambs", "Moonlight", "E.T.", "Dirty Dancing", "Midnight in Paris", "The Shining", "Seven"];

const clearMovies = ["Little Miss Sunshine", "The Grand Budapest Hotel", "Green Book", "The Legend of Cocaine Island", "Mamma Mia", "Wet Hot American Summer", "High School Musical 2", "Shrek", "Spider-Man", "Y tu mamá también", "Ferris Bueller’s Day Off", "School Of Rock", "Wonder", "Indiana Jones", "Ratatouille", "Groundhog Day", "Chef", "Isle of Men", "Pirates of the Caribbean", "Space Jam", "Moana", "Princess Mononoke", "The Floating Castle", "Star Wars", "Aladdin", "My Neighbour Totoro", "The Lion King", "Toy Story", "Spirited Away", "Scott Pilgrim Against The World"];

const mistMovies = ["Get Out", "Halloween", "Train To Busan", "Hocus Pocus", "Midsommer", "The Shining", "IT", "The Nightmare Before Christmas", "American Psycho", "Lighthouse", "The Black Cat", "Fogbound", "The Cabin In The Woods", "Alien", "Death Note", "Zodiac", ""];

const randomCloudMovie = () => `${cloudMovies[Math.floor(Math.random() * cloudMovies.length)]}`;

const randomRainMovie = () => `${rainMovies[Math.floor(Math.random() * rainMovies.length)]}`;

const randomClearMovie = () => `${clearMovies[Math.floor(Math.random() * clearMovies.length)]}`;

const randomMistMovie = () => `${mistMovies[Math.floor(Math.random() * mistMovies.length)]}`;

$(document).ready(documentReady);

function documentReady() {



}

function ams() {



    fetch(`${api.base}weather?q=Amsterdam,NL&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}



function lon() {

    fetch(`${api.base}weather?q=London,UK&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function mos() {

    fetch(`${api.base}weather?q=Moscow,RU&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function ny() {

    fetch(`${api.base}weather?q=New%20York,US&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function tok() {

    fetch(`${api.base}weather?q=Tokyo,JAP&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function par() {

    fetch(`${api.base}weather?q=Paris,FR&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}



function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);

    }

}

function getResults(query) {

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {

    console.log(weather);
    let city = document.querySelector(' .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;


    let weather2_el = document.querySelector('.weather2');
    weather2_el.innerText = weather.weather[0].main;

    let wIcon = document.getElementById("weatherPic");
    if (weather.weather[0].id == 800) {

        wIcon.src = 'Images/01d.png';
    } else if (weather.weather[0].id > 800) {

        wIcon.src = 'Images/02d.png';
    } else if (weather.weather[0].id < 250) {

        wIcon.src = 'Images/11d.png';

    } else if (weather.weather[0].id < 350) {

        wIcon.src = 'Images/09d.png';
    } else if (weather.weather[0].id < 600) {

        wIcon.src = 'Images/10d.png';

    } else if (weather.weather[0].id < 650) {

        wIcon.src = 'Images/13d.png';
    } else if (weather.weather[0].id < 800) {

        wIcon.src = 'Images/50d.png';
    }





    let weather_el = document.querySelector('.weather');

    if (weather2_el.textContent == `Clouds`) {
        //document.vl.style.height = "650px";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomCloudMovie()}`;
    } else if (weather2_el.textContent == `Thunderstorm`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomRainMovie()}`;
    } else if (weather2_el.textContent == `Drizzle`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomRainMovie()}`;
    } else if (weather2_el.textContent == `Rain`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomRainMovie()}`;
    } else if (weather2_el.textContent == `Snow`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomMovie()}`;
    } else if (weather2_el.textContent == `Mist`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomMistMovie()}`;
    } else if (weather2_el.textContent == `Clear`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomClearMovie()}`;
    } else if (weather2_el.textContent == `Smoke`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomMistMovie()}`;
    } else if (weather2_el.textContent == `Haze`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomCloudMovie()}`;
    } else if (weather2_el.textContent == `Dust`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomMistMovie()}`;
    } else if (weather2_el.textContent == `Fog`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomMistMovie()}`;
    } else if (weather2_el.textContent == `Sand`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomClearMovie()}`;
    } else if (weather2_el.textContent == `Ash`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomRainMovie()}`;
    } else if (weather2_el.textContent == `Tornado`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomCloudMovie()}`;
    } else if (weather2_el.textContent == `Squall`) {
        // document.body.style.backgroundImage = "url('Piccas/03n.jpg')";
        let rMovie = document.querySelector(' .rMovie');
        rMovie.innerText = `${randomRainMovie()}`;
    }
}
