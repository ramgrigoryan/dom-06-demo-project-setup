const addMovieBtn = document.querySelector("header button");
const modalEffect = document.getElementById("backdrop");
const addModal = document.getElementById("add-modal");
const cancelBtn = addModal.querySelector("button");
const addBtn = cancelBtn.nextElementSibling;
const noBtn = document.querySelectorAll(".btn--passive")[1];
let yesBtn = document.querySelector(".btn--danger");
const userInputs = document.querySelectorAll("input");
const entryText = document.getElementById("entry-text");
const movieList = document.getElementById("movie-list");
const deleteModal = document.getElementById("delete-modal");

const movies = [];

const confirmDeletion = (index) => {
  deleteModal.classList.add("visible");
  showMovieModal();
  yesBtn.replaceWith(yesBtn.cloneNode(true));
  yesBtn = document.querySelector(".btn--danger");
  noBtn.removeEventListener("click", closeMovieModal);
  noBtn.addEventListener("click", closeMovieModal);
  yesBtn.addEventListener("click", deleteMovie.bind(null, index));
};

const deleteMovie = (index) => {
  let movieIndex = 0;
  for (const i of movies) {
    if (i.index === index) {
      confirmDeletion();
      movies.splice(movieIndex, 1);
      movieList.children[movieIndex].remove();
      updateUI();
      closeMovieModal();
      break;
    }
    movieIndex++;
  }
};

const renderMovie = (index, title, imageUrl, rating) => {
  const newMovie = document.createElement("li");
  newMovie.className = "movie-element";
  newMovie.innerHTML = `
  <div class="movie-element__image" >
    <img src=${imageUrl} alt=${title}>
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>Rating: ${rating}/5 </p>
  </div>
  `;
  newMovie.index = index;
  newMovie.addEventListener("click", confirmDeletion.bind(null, index));
  movies.push(newMovie);
  movieList.append(newMovie);
};

const updateUI = () => {
  if (movies.length === 0) {
    entryText.style.display = "block";
  } else {
    entryText.style.display = "none";
  }
};

const showMovieModal = () => {
  modalEffect.classList.add("visible");
};

const closeMovieModal = () => {
  modalEffect.classList.remove("visible");
  deleteModal.classList.remove("visible");
  addModal.classList.remove("visible");
};

const toggleMovieModal = () => {
  for (let i of userInputs) {
    i.value = "";
  }
  modalEffect.classList.toggle("visible");
  addModal.classList.toggle("visible");
};

const addMovie = () => {
  const generateIndex = Math.random();
  const favoriteMovie = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const movieRating = userInputs[2].value;
  if (
    favoriteMovie.trim === "" ||
    imageUrl.trim() === "" ||
    +movieRating < 1 ||
    +movieRating > 5
  ) {
    alert("Wrong Input. Please try again.");
    return;
  }
  renderMovie(generateIndex, favoriteMovie, imageUrl, movieRating);
  updateUI();
  toggleMovieModal();
};

addMovieBtn.addEventListener("click", toggleMovieModal);
modalEffect.addEventListener("click", closeMovieModal);
cancelBtn.addEventListener("click", toggleMovieModal);
addBtn.addEventListener("click", addMovie);
