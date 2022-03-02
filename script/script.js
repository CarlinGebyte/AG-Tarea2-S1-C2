const API_URL = "https://rickandmortyapi.com/api/character/";
// const IMG_PATH = `https://rickandmortyapi.com/api/character/avatar/`;
const SEARCH_URL =
    'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.querySelector("#main");

const getCharacters = async (url) => {
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
            showCharacters(data.results);
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

getCharacters(API_URL);

const showCharacters = (characters) => {
    main.innerHTML = "";
    characters.forEach(character => {
        const { name, image, status, species} = character;
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
        <img src="${image}" alt="">
        <div class="movie-info">
            <h3>${name}</h3>
            <span class="green">${status}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
            <p>${species}</p>
        </div>
        `
        main.appendChild(movieDiv);
    });
    console.log(characters)
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.toLocaleLowerCase();
    if (searchTerm != "") {
        movies = getCharacters(SEARCH_URL + searchTerm);
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