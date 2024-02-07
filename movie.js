class Movie {
  constructor(
    imdbID,
    poster,
    title,
    rating,
    movielength,
    genre,
    plot,
    watchlist
  ) {
    this.imdbID = imdbID;
    this.poster = poster;
    this.title = title;
    this.rating = rating;
    this.movielength = movielength;
    this.genre = genre;
    this.plot = plot;
    this.watchlist = watchlist;
  }
  inWatchlist() {
    if (localStorage.getItem(this.imdbID) === null) {
      return '<ion-icon name="add-outline"></ion-icon>&nbspWatchlist';
    }
    return '<ion-icon name="remove-outline"></ion-icon>&nbspRemove';
  }
  hasPoster() {
    if (this.poster !== "N/A") {
      return this.poster;
    }
    return "https://discussions.apple.com/content/attachment/660042040";
  }
  text() {
    const { imdbID, title, rating, movielength, genre, plot, watchlist } = this;
    return `
        <div class="movie">
            <img src="${this.hasPoster()}" alt="">
            <div class="right-side">
                <div class="movie-first-line">
                    <h2>${title}</h2>
                    <p>⭐ ${rating}</p>
                </div>
                <div class="movie-second-line">
                    <p>${movielength}</p>
                    <p>${genre}</p>
                    <button class="watchlist-btn" id="${imdbID}">${this.inWatchlist()}</button>
                </div>
                <div class="movie-plot">
                    <p>${plot}</p>
                </div>
            </div>
        </div>`;
  }
}

export { Movie };
