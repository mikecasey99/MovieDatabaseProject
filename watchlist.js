import {Movie} from './movie.js'

const movieDom = document.getElementById("main-content");

function allStorage() {
    let values = []
    let keys = Object.keys(localStorage)
    let i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    // Parsing local storage
    let output = values.map(x => JSON.parse(x));
    //Check if the object is actually a movie
    let moviesCheck = output.map(x => {
        if(x.imdbID !== undefined && x.imdbID !== null){
            return x;
        }
    })
    return moviesCheck;
}


function render(){
    let totalHtml = "";
    let output = allStorage();
    //Edge case for 0 movies left
    if(output.length === 0){
        movieDom.innerHTML = `
        <div class="temp">
            <ion-icon name="film-outline"></ion-icon>
            <p id="temp-explore">Your Watchlist is Empty</p>
        </div>`
        return "";
    }
    //Generate DOM elements for all movies
    for(let j = 0; j < output.length; j++){
        let curMovie = new Movie(output[j].imdbID, output[j].poster, output[j].title, output[j].rating, output[j].movielength,
            output[j].genre, output[j].plot, true);
        totalHtml += curMovie.text();
    }
    //Update dom
    movieDom.innerHTML = totalHtml;
    //Add event listener to all buttons to either add or remove from watchlist
    let watchlistButtons = document.querySelectorAll(".watchlist-btn");
    for(let k = 0; k < watchlistButtons.length; k++){
        watchlistButtons[k].addEventListener("click", () => {
                localStorage.removeItem(watchlistButtons[k].id)
                render();
        })
    }
}
//Initializing render
render();
