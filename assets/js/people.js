import API_KEY from "./config.js";
const API_key = API_KEY;
const image_path = "https://image.tmdb.org/t/p/w1280";
const movieContainer = document.getElementById("movies-container");
const movieInfoContent = document.getElementById("movie-info");
const movieDetails = document.getElementById("movie-details");
const search = document.getElementById("search-movies");
const castContainer = document.getElementById("cast-list");
const btnClosed = document.getElementById("btn-closed");
const spinner = document.querySelector(".spinner");
let page = 1;

/* ========== Movie Pagination Infinite Scroll ========== */
window.onscroll = infiniteScroll;

// This variable is used to remember if the function was executed.
var isExecuted = false;

function infiniteScroll() {
  // Inside the "if" statement the "isExecuted" variable is negated to allow initial code execution.
  if (
    window.scrollY > document.body.offsetHeight - window.outerHeight &&
    !isExecuted
  ) {
    // Set "isExecuted" to "true" to prevent further execution
    isExecuted = true;

    if (page === 500) {
      disableScrolling();
    } else {
      showLoadingBar();
    }

    // After 1 second the "isExecuted" will be set to "false" to allow the code inside the "if" statement to be executed again
    setTimeout(() => {
      isExecuted = false;
    }, 1000);
  }
}

function showLoadingBar() {
  //infinite scrolling animation
  spinner.classList.add("show");
  setTimeout(getActors, 1500);
  page++;
}

function disableScrolling() {
  var offset = $(window).scrollTop();

  //console.log("page Y-Offset: ", offset); // just to see it working
  if (offset >= 100) $(window).off("scroll");
  spinner.classList.remove("show");
}

getActors().catch((error) => {
  // console.log(error);
});

async function getActors() {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${API_key}&language=en-US&page=${page}`
  );
  const Moviedata = await response.json();

  //console.log(Moviedata.results[0].original_title);

  showActorInfo(Moviedata.results);
  //movies = await response.json();
}

/* ========== Movie Search ========== */
$(".form").submit(function (event) {
  const searchMovies = search.value;

  if (searchMovies == "") {
    alert("field is empty");
  } else {
    location.replace("/assets/people/searchPeople.html");
    localStorage.setItem("Celebrity", searchMovies);
    // console.log(searchMovies);
  }
  event.preventDefault();
});

/* ========== Movie Search END ========== */

function getKnownFor(known_for) {
  const overview_details = document.getElementById("overview-details");

  overview_details.innerHTML = " ";

  known_for.forEach((movie) => {
    const { overview, original_title } = movie;

    const movieEL = document.createElement("div");
    movieEL.classList.add("overview-list");

    movieEL.innerHTML = `
         
         <div class="overview-info">

            <p>${overview}</>
         </div>
         
         `;

    overview_details.appendChild(movieEL);
  });
}

function getMovieId(ID) {
  //getting the movie ID
  const Id = ID;
  const trailerURL = `https://api.themoviedb.org/3/person/${Id}/combined_credits?api_key=${API_KEY}&language=en-US`;
  fetch(trailerURL)
    .then((res) => res.json())
    .then((movieList) => {
      actorMovieList(movieList.cast);
    })
    .catch((error) => {
      //   console.log(error);
    });
}

function actorMovieList(movieList) {
  castContainer.innerHTML = "";
  movieList.forEach((movieLists) => {
    const { title, poster_path } = movieLists;

    const castList = document.createElement("div");
    castList.classList.add("swiper-slide");

    castList.innerHTML = `

            <img class="actor-img" src="${
              image_path + poster_path
            }" onerror="this.src = '/assets/img/poster-placeholder.svg'">
            <h4>${title}</h4>
        `;

    castContainer.appendChild(castList);

    // $(".cast-list .swiper-slide").slice(10).remove() // display only 10 div
  });
}

function showActorInfo(movies) {
  movies.forEach((movie) => {
    const { profile_path, name, id } = movie;
    const movieEL = document.createElement("div");
    movieEL.classList.add("movies-list");

    movieEL.innerHTML = `<img src="${
      image_path + profile_path
    }" alt=${name} onerror="this.src = '/assets/img/poster-placeholder.svg'">
         
         <div class="movie-title">
            <h3>${name}</h3>
         </div>
         `;

    movieEL.addEventListener("click", () => {
      showActorMovieInfo(movie); // it will pass the movie details
      getKnownFor(movie.known_for);
      getMovieId(movie.id);
      //getMovieId(movie.id)//it will pass the movie ID for the trailer
      movieInfoContent.style.display = "block";
      //console.log(movie.title)
    });

    movieContainer.appendChild(movieEL);
  });
}

function showActorMovieInfo(movie) {
  movieDetails.innerHTML = `
        <div class ="overview-img">
        <img class="desktop-img" src="${image_path + movie.profile_path}">


        </div>
        <div class="overview-text">
        <h2 class="celebrity_name">${movie.name}</h2>
    
        <div class="overview-details" id="overview-details">
        
        </div>
        
        `;
}

movieInfoContent.style.display = "none"; //Default hidden on page load

btnClosed.addEventListener("click", function () {
  if (movieInfoContent.style.display !== "none") {
    movieInfoContent.style.display = "none";
  } else {
    movieInfoContent.style.display = "block";
  }
});
