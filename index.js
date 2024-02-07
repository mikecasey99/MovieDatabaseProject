import { Movie } from "./movie.js";

const input = document.getElementById("searchQuery");
const search = document.getElementById("searchBtn");
const movieDom = document.getElementById("main-content");
const token = config.TOKEN;

async function movieGenerate() {
  let totalHtml = "";
  let movieIDs = [];
  let movies = [];
  movieDom.innerHTML = "";
  const userInput = await fetch(
    `http://www.omdbapi.com/?apikey=${token}&s=${input.value}&type=movie`
  );
  const results = await userInput.json();
  //Get movies
  for (let i = 0; i < results.Search.length; i++) {
    movieIDs.push(results.Search[i].imdbID);
  }
  //Get more data about each indidual movie
  for (let j = 0; j < movieIDs.length; j++) {
    let fullMovieData = await fetch(
      `http://www.omdbapi.com/?apikey=${token}&s&i=${movieIDs[j]}`
    );
    let movieData = await fullMovieData.json();
    let curMovie = new Movie(
      movieData.imdbID,
      movieData.Poster,
      movieData.Title,
      movieData.imdbRating,
      movieData.Runtime,
      movieData.Genre,
      movieData.Plot,
      false
    );
    movies.push(curMovie);
    totalHtml += curMovie.text();
  }
  //Update dom
  movieDom.innerHTML = totalHtml;
  //Add event listener to all buttons to either add or remove from watchlist
  let watchlistButtons = document.querySelectorAll(".watchlist-btn");
  for (let k = 0; k < watchlistButtons.length; k++) {
    watchlistButtons[k].addEventListener("click", () => {
      //Movie doesn't exist in localStorage
      if (localStorage.getItem(watchlistButtons[k].id) === null) {
        localStorage.setItem(watchlistButtons[k].id, JSON.stringify(movies[k]));
        watchlistButtons[k].innerHTML =
          '<ion-icon name="remove-outline"></ion-icon> Remove';
      }
      //Movie already exists in localStorage
      else {
        localStorage.removeItem(watchlistButtons[k].id);
        watchlistButtons[k].innerHTML =
          '<ion-icon name="add-outline"></ion-icon> Watchlist';
      }
    });
  }
}

search.addEventListener("click", movieGenerate);
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    movieGenerate();
  }
});
