const  movieTitle = localStorage.getItem("Movie Name");



const API_key = "5c55ccbac7dc48c2b93eea2b7863df0b";
const image_path = "https://image.tmdb.org/t/p/w1280";
const searchAPI = `https://api.themoviedb.org/3/search/movie?api_key=${API_key}&query=`



const movieContainer = document.getElementById("movies-container");
const movieInfoContent = document.getElementById("movie-info")
const movieDetails = document.getElementById("movie-details");
const search = document.getElementById("search-movies");
const form = document.getElementById("form");


getMovies(searchAPI).catch(error => {
    console.log(error);
}); ;


async function getMovies(url){
    movieContainer.innerHTML = "";
    const response  = await fetch(url + movieTitle);
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
        fetch(searchAPI+searchMovies).then((res) => res.json())
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




