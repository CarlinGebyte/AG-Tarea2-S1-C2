const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_URL =
    'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.querySelector("#main");

const getMovies = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.results.length === 0) {
            swal.fire({
                title: "Error!",
                text: "No se ha encontrado ninguna pelicula",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } else {
            showMovies(data.results);
        }
    } catch (error) {
        swal.fire({
            title: "Error!",
            text: error,
            icon: "error",
            confirmButtonText: "Aceptar",
        });
    }
};

getMovies(API_URL);

const showMovies = (movies) => {
    main.innerHTML = "";
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="green">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
            <h3>${overview}</h3>
        </div>
        `
        main.appendChild(movieDiv);
    });
    console.log(movies)
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.toLocaleLowerCase();
    if (searchTerm != "") {
        movies = getMovies(SEARCH_URL + searchTerm);
        search.value = '';
    } else {
        swal.fire({
            title: "Error!",
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Cool",
        });
    }
})