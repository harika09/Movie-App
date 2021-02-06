const  movieTitle = localStorage.getItem("Movie Name");
import API_KEY from "./config.js"
const API_key = API_KEY

const image_path = "https://image.tmdb.org/t/p/w1280";
const castContainer = document.getElementById("cast-list");
const dropdownMovie = document.getElementById("dropdown-btn");
const headerMovieList = document.getElementById("dropdown-content")
const dropdownTv = document.getElementById("dropdown-btn-tv")
const headerTVList = document.getElementById("tv-dropdown-content")
const dropdownPeople = document.getElementById("dropdown-btn-people")
const headerPeopleList = document.getElementById("people-dropdown-content")
const movieContainer = document.getElementById("movies-container");
const movieInfoContent = document.getElementById("movie-info")
const movieDetails = document.getElementById("movie-details");
const search = document.getElementById("search-movies");
const form = document.getElementById("form");


getMovies().catch(error => {
    console.log(error);
}); ;


async function getMovies(){
    movieContainer.innerHTML = "";
    const response  = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_key}&query=` + movieTitle);
    console.log(response)
    const Moviedata = await response.json();

    //console.log(Moviedata.results[0].original_title);

    showMovies(Moviedata.results)
    //movies = await response.json();
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchMovies = search.value;

    if(searchMovies == ""){
      alert('field is empty')
    }else{
        
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_key}&query=`+searchMovies).then((res) => res.json())
        .then((data) =>{
          
            movieContainer.innerHTML = "";
            showMovies(data.results)
           
        }).catch((error)=>{
            console.log(error);
        })

      
    }
    
})



function showMovies(movies){
   

    movies.forEach((movie) => {
        const { poster_path, title} = movie; 

        const movieEL = document.createElement("div");
        movieEL.classList.add("movies-list");

        movieEL.innerHTML = 
         `<img src="${image_path + poster_path}" alt=${title} onerror="this.src = '/assets/img/poster-placeholder.svg'">
         
         <div class="movie-title">
         <h3>${title}</h3>
         </div>
         `;

         movieEL.addEventListener("click", () =>{
            showMovieInfo(movie)
            movieInfoContent.style.display = "block";
           //console.log(movie.title)

       });

         movieContainer.appendChild(movieEL);

        
    });
}



function showMovieInfo (movie){
    
        movieDetails.innerHTML = (`
    <div class ="overview-img">
    <img class="desktop-img" src="${image_path + movie.poster_path}" onerror="this.src = '/assets/img/poster-placeholder.svg'">
   

    </div>
    <div class="overview-text">
    <h2 class="movie-title">${movie.title}</h2>
    <p>${movie.overview}</p>
    </div>
    <button class="btn-closed" id="btn-closed" onclick="closed()"><i class='bx bx-x-circle'></i></button>
    
    `);
}



function closed(){
    const btn_closed = document.getElementById("btn-closed");

    movieInfoContent.style.display = 'none' //Default hidden on page load

    btn_closed.addEventListener("click", function(){
        if(movieInfoContent.style.display !== 'none'){
            movieInfoContent.style.display = 'none';
        } else{
            movieInfoContent.style.display = 'block';
        }
    })
}


headerMovieList.style.display = 'none' //Default hidden on page load

dropdownMovie.addEventListener("click", function(event){
    event.preventDefault();
    if(headerMovieList.style.display !== 'none'){
        headerMovieList.style.display = 'none';
    } else{
        headerMovieList.style.display = 'block';
    }
})

headerTVList.style.display = 'none' //Default hidden on page load

dropdownTv.addEventListener("click", function(event){
    event.preventDefault();
    if(headerTVList.style.display !== 'none'){
        headerTVList.style.display = 'none';
    } else{
        headerTVList.style.display = 'block';
    }
})

headerPeopleList.style.display = 'none' //Default hidden on page load

dropdownPeople.addEventListener("click", function(event){
    event.preventDefault();
    if(headerPeopleList.style.display !== 'none'){
        headerPeopleList.style.display = 'none';
    } else{
        headerPeopleList.style.display = 'block';
    }
})




