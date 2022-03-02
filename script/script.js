const API_URL = "https://rickandmortyapi.com/api/character/";
// const IMG_PATH = `https://rickandmortyapi.com/api/character/avatar/`;
const SEARCH_URL = "https://rickandmortyapi.com/api/character/?name=";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.querySelector("#main");

const getCharacters = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.results === undefined) {
            swal.fire({
                title: "Error!",
                text: "No se ha encontrado ningún personaje",
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
        const { name, image, status, species, gender, origin, location, created} = character;
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
            <p>Especie: ${species} <br>
                Género ${gender} <br>
                Origen: ${origin.name} <br>
                Localización: ${location.name} <br>
                Fecha: ${created}</p>
        </div>
        `;
        main.appendChild(movieDiv);
    });
    console.log(characters)
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.toLocaleLowerCase();
    if (searchTerm != "") {
        characters = getCharacters(SEARCH_URL + searchTerm);
        search.value = '';
    } else {
        swal.fire({
            title: "Error!",
            text: "Por favor, ingresa un texto para buscar",
            icon: "error",
            confirmButtonText: "Cool",
        });
    }
})