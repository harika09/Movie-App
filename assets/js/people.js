const API_key = "5c55ccbac7dc48c2b93eea2b7863df0b";
const image_path = "https://image.tmdb.org/t/p/w1280";
const searchAPI = `https://api.themoviedb.org/3/search/person?api_key=${API_key}&language=en-US&page=1&include_adult=false&query=`
const base_URL = `https://api.themoviedb.org/3/person/popular?api_key=${API_key}&language=en-US&page=1`;


const movieContainer = document.getElementById("movies-container");
const movieInfoContent = document.getElementById("movie-info")
const movieDetails = document.getElementById("movie-details");
const search = document.getElementById("search-movies");
const form = document.getElementById("form");
const trailerContainer = document.getElementById("trailer");
const trailer = document.getElementById("trailer-youtube");



getMovies(base_URL).catch(error => {
    console.log(error);
}); ;


async function getMovies(url){
 
    const response  = await fetch(url);
    const Moviedata = await response.json();

    //console.log(Moviedata.results[0].original_title);

    showMovies(Moviedata.results);
   
    //movies = await response.json();
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searhMovies = search.value;

    if(searhMovies == ""){
      alert('field is empty')
    }else{
        getMovies(searchAPI + searhMovies);
        search.value = "";
    }
})

function getKnownFor(known_for){

    const overview_details = document.getElementById("overview-details");

    overview_details.innerHTML = " ";

    known_for.forEach((movie) => {
        const { overview, original_title} = movie; 

      
        const movieEL = document.createElement("div");
        movieEL.classList.add("overview-list");

        movieEL.innerHTML = 
         `
         
         <div class="overview-title">
         <h3>${original_title}</h3>
         <p>${overview}</>
         </div>
         `;

        

         overview_details.appendChild(movieEL);

        
    });

}


function showMovies(movies){

    
    movieContainer.innerHTML = " ";

    movies.forEach((movie) => {
        const { profile_path, name, id} = movie; 

      
        const movieEL = document.createElement("div");
        movieEL.classList.add("movies-list");

        movieEL.innerHTML = 
         `<img src="${image_path + profile_path}" alt=${name}>
         
         <div class="movie-title">
         <h3>${name}</h3>
         </div>
         `;

         

         movieEL.addEventListener("click", () =>{
            showMovieInfo(movie)// it will pass the movie details
            getKnownFor(movie.known_for);
            //getMovieId(movie.id)//it will pass the movie ID for the trailer
            movieInfoContent.style.display = "block";
           //console.log(movie.title)

       });

         movieContainer.appendChild(movieEL);

        
    });
}



function showMovieInfo (movie){

        
  
        movieDetails.innerHTML = (`
    <div class ="overview-img">
    <img class="desktop-img" src="${image_path + movie.profile_path}">
    <img class="mobile-img" src="${image_path + movie.known_for[0].backdrop_path}">

    </div>
    <div class="overview-text">
    <h2 class="movie-title">${movie.name}</h2>
  
    <button class="btn-closed" id="btn-closed" onclick="closed()"><i class='bx bx-x-circle'></i></button>
    <div class="overview-details" id="overview-details">
    
    </div>
    
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




