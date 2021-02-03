const API_key = "5c55ccbac7dc48c2b93eea2b7863df0b";
const image_path = "https://image.tmdb.org/t/p/w1280";
const searchAPI = `https://api.themoviedb.org/3/search/tv?api_key=5c55ccbac7dc48c2b93eea2b7863df0b&language=en-US&page=1&query=`
const base_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_key}&language=en-US&page=1`;


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


function getMovieId(ID){ //getting the movie ID
    const Id = ID;

    const URL = ` https://api.themoviedb.org/3/tv/${Id}/videos?api_key=${API_key}&language=en-US`

    fetch(URL).then((res) => res.json())
    .then((data) =>{
        showTrailer(data.results[0].key); //getting the first key to be linked on youtube
    }).catch((error)=>{
        console.log(error);
    })

    console.log(Id);
}


function showTrailer(key){
    const btnTrailer = document.getElementById("btn-trailer");
    const youtubeURL = "https://www.youtube.com/embed/";
    //console.log("Movie: " + youtubeURL + key);
    trailerContainer.style.display = 'none';

  btnTrailer.addEventListener("click", function(){
    if(trailerContainer.style.display !== 'none'){
        trailerContainer.style.display = 'none';
       
    } else{
        trailerContainer.style.display = 'block'; 
        trailer.innerHTML =`
        <iframe class="video-trailer" src="${youtubeURL+key}" frameborder="0" allowfullscreen>
        </iframe> 
        `; 
    }
  })
     
}



function showMovies(movies){

    
    movieContainer.innerHTML = " ";

    movies.forEach((movie) => {
        const { poster_path, name, id} = movie; 

      
        const movieEL = document.createElement("div");
        movieEL.classList.add("movies-list");

        movieEL.innerHTML = 
         `<img src="${image_path + poster_path}" alt=${name} onerror="this.src = 'http://placehold.jp/550x750.png'">
         
         <div class="movie-title">
         <h3>${name}</h3>
         </div>
         `;

         

         movieEL.addEventListener("click", () =>{
            showMovieInfo(movie)// it will pass the movie details
            getMovieId(movie.id)//it will pass the movie ID for the trailer
            movieInfoContent.style.display = "block";
           //console.log(movie.title)

       });

         movieContainer.appendChild(movieEL);

        
    });
}



function showMovieInfo (movie){
  
        movieDetails.innerHTML = (`
    <div class ="overview-img">
    <img class="desktop-img" src="${image_path + movie.poster_path}" onerror="this.src = 'http://placehold.jp/550x750.png'">

    </div>
    <div class="overview-text">
    <h2 class="movie-title">${movie.name}</h2>
    <p>${movie.overview}</p>
    
    </div>
    <button class="btn-trailer" id="btn-trailer" onclick="showTrailer()"><i class='bx bx-play'></i>  Play Trailer</button>
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




