# Movie Respository

This project was built using vanilla JavaScript and is mobile responsive. Unfortunately, since I'm not using Node, I was not able to declare environment variables; therefore, you will have to obtain an API key yourself. All movies are saved in localstorage.
![](https://github.com/mikecasey99/MovieDatabaseProject/Readme.gif)

## Installation

1. Clone the repo.

2. Register an account on https://www.omdbapi.com/ and get an API key. 

3. Create a Javascript file titled ' config.js ' in the same directory. 

4. Paste your key into the object and things should work after you host it on Live Server.

```javascript
const config = {
  TOKEN: "PASTE_KEY_HERE"
};
```
