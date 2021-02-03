import API_KEY from "../config.js"
const API_key = API_KEY

const image_path = "https://image.tmdb.org/t/p/w1280";
const movieContainer = document.getElementById("movies-container");
const movieInfoContent = document.getElementById("movie-info")
const movieDetails = document.getElementById("movie-details");
const search = document.getElementById("search-movies");
const form = document.getElementById("form");
const trailerContainer = document.getElementById("trailer");
const trailer = document.getElementById("trailer-youtube");
const recommendContainer = document.getElementById("recommendation-list");
const castContainer = document.getElementById("cast-list");
const btnClosed = document.getElementById("btn-closed");
const btnTrailerClosed = document.getElementById("btn-trailer-closed");

let movieArray = [];
let page = 1;

/* ========== Movie Pagination Infinite Scroll ========== */ 

$(window).on("scroll", function() {
	var scrollHeight = $(document).height();
	var scrollPosition = $(window).height() + $(window).scrollTop();
	if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
	    // when scroll to bottom of the page
            showLoadingBar();
	}
});

/*window.addEventListener("scroll", () =>{

	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	//console.log( { scrollTop, scrollHeight, clientHeight });
	if(clientHeight + scrollTop >= scrollHeight - 5) {
        showLoadingBar();
	}

});*/
function showLoadingBar() { //infinite scrolling animation
    setTimeout(getMovies, 1000)
    page++;
}

/* ========== Movie Pagination Infinite Scroll END ========== */ 



function loadingAnimation(recomDatas){
    
    setTimeout(showMovieInfo(recomDatas), 1000)
}


getMovies().catch(error => {
    console.log(error);
}); ;


async function getMovies(){

    const base_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_key}&language=en-US&page=${page}`;
    const response  = await fetch(base_URL);
    movieArray = await response.json();

    showMovies(movieArray.results);
}

/* ========== Movie Search ========== */ 
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchMovies = search.value;

    if(searchMovies == ""){
      alert('field is empty')
    }else{
        location.replace("/assets/movies/search.html");
        localStorage.setItem("Movie Name", searchMovies);
       
    }
})
/* ========== Movie Search END ========== */ 

/* ========== Movie ID ========== */ 
function getMovieId(ID){ //getting the movie ID
    const Id = ID;
    const trailerURL = ` https://api.themoviedb.org/3/movie/${Id}/videos?api_key=${API_key}&language=en-US`

    fetch(trailerURL).then((res) => res.json())
    .then((data) =>{
        showTrailer(data.results[0].key); //getting the first key to be linked on youtube
        
    }).catch((error)=>{
        console.log(error);
    })

    const recommendation_URL = `https://api.themoviedb.org/3/movie/${Id}/recommendations?api_key=${API_key}&language=en-US&page=1`
    fetch(recommendation_URL).then((recom)=>recom.json())
    .then((data)=>{
        getRecomData(data.results)
        
    }).catch((error)=>{
        console.log(error);
    })

    const genresURL = `https://api.themoviedb.org/3/movie/${Id}?api_key=${API_key}&language=en-US`
    fetch(genresURL).then((res) => res.json())
    .then((data) =>{
        getData(data.genres)
    }).catch((error)=>{
        console.log(error);
    })

    const cast_URL = `https://api.themoviedb.org/3/movie/${Id}/credits?api_key=${API_key}&language=en-US`;
    fetch(cast_URL).then((casts)=>casts.json())
    .then((data)=>{
        getCast(data.cast);
    }).catch((error)=>{
        console.log(error);
    });

    
}
/* ========== Movie ID END ========== */ 

/* ========== Movie Trailer ========== */ 
function showTrailer(key){
    const keys = key
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
          <iframe class="video-trailer" src="${youtubeURL+keys}" frameborder="0" allowfullscreen>
          </iframe> 
          `; 
      }
    })

}
/* ========== Movie Trailer END ========== */ 





/* ========== Movie Information List ========== */ 
function showMovies(movies){

    movies.forEach((movie) => {
        const { poster_path, title, vote_average} = movie; 
        
        const movieEL = document.createElement("div");
        movieEL.classList.add("movies-list");

        movieEL.innerHTML = 
         `<img src="${image_path + poster_path}" alt=${title} id="poster" onerror="this.src = '/assets/img/poster-placeholder.svg'">
         
         <div class="movie-title">
         <h3>Title: ${title}</h3>

         <p class="ratings">${parseInt(vote_average.toString().replace('.', ''))}<span class="percent">%</span></p>
         </div>
         `;
      
         movieEL.addEventListener("click", () =>{
            showMovieInfo(movie)// it will pass the movie details
            getMovieId(movie.id)//it will pass the movie ID for the trailer
            //console.log(movie.id);
            movieInfoContent.style.display = "block";
           //console.log(movie.title)

       });

         movieContainer.appendChild(movieEL);

        
    });
}

function showMovieInfo (movie){
  
        movieDetails.innerHTML = (`
        <div>
            <div class ="overview-img">
                <img class="desktop-img" src="${image_path + movie.poster_path}" onerror="this.src = '/assets/img/poster-placeholder.svg'">
                <img class="mobile-img" src="${image_path + movie.backdrop_path}">
            </div>

            <div class="movie-rating">
                <h2 class="movie-title">${movie.title}</h2>
                <p class="ratings">${parseInt(movie.vote_average.toString().replace('.', ''))}<span class="percent">%</span></p>
            </div>

            <div class="movie-ratings-container">
                <div class="movie-date">
                        <p>Release Date: ${movie.release_date.replace("-","/").replace("-","/")}</p>
                </div>

                <div class="movie-genres" id="movie-genres">

                </div>

                <div class="movie-trailer">
                   
                    <button class="btn-trailer" id="btn-trailer" onclick="showTrailer()"><i class='bx bx-play'></i>  Play Trailer</button>
                </div>
                
            </div>
            <!--<button class="btn-closed" id="btn-closed" onclick="closed()"><i class='bx bx-x-circle'></i></button>-->
            <p class="movie-overview"><span>Overview:</span> <br> ${movie.overview}</p>
    </div>
  
   
    `);

   //getMovieData(movie.id);
   //recommendData(movie.id);
   //castData(movie.id);
 
}

/* ========== Movie Information List END ========== */ 



/* ========== Movie Genres List ========== */ 
function getData(data){
    const movie_genres = document.getElementById("movie-genres");
    movie_genres.innerHTML = "";
    data.forEach((genres) => {
        const { name } = genres; 
        const movieGenres = document.createElement("div");
        movieGenres.classList.add("genres-list");
        movieGenres.innerHTML = `
         <div class="movie-genres">
            <p>${name}<span>.</span></p>
         </div>
         `;
         movie_genres.appendChild(movieGenres);        
    });
}
/* ========== Movie Genres List END ========== */ 


/* ========== Movie Cast List ========== */
function getCast(cast){
    castContainer.innerHTML = "";
    cast.forEach((casts) =>{
        const { name, profile_path} = casts;

        const castList = document.createElement("div");
        castList.classList.add("swiper-slide");

        castList.innerHTML = `

            <img class="actor-img" src="${image_path + profile_path}" onerror="this.src = '/assets/img/poster-placeholder.svg'">
            <h4 class="actor-name">${name}</h4>
        `

        castContainer.appendChild(castList);

        $(".cast-list .swiper-slide").slice(10).remove() // display only 10 div
    })
}
/* ========== Movie Cast List END  ========== */



/* ========== Movie Recommendation List ========== */
function getRecomData(recomData){

    recommendContainer.innerHTML = "";
    recomData.forEach((recomDatas) =>{
        const { poster_path, title, vote_coount} = recomDatas;

        const recommendation_list = document.createElement("div");
        recommendation_list.classList.add("swiper-slide");

        recommendation_list.innerHTML = `
        
            <img class="recommendation-img" src="${image_path + poster_path}" onerror="this.src = '/assets/img/poster-placeholder.svg'">
            <h4 class="recommendation-title">${title}</h4>
            `

        recommendation_list.addEventListener('click', function(){
           loadingAnimation(recomDatas);
            getMovieId(recomDatas.id);
           
        })

        recommendContainer.appendChild(recommendation_list);
        
    })
}
/* ========== Movie Recommendation List END ========== */





/* ========== Closed Modal ========== */
movieInfoContent.style.display = 'none' //Default hidden on page load

btnClosed.addEventListener("click", function(){
    if(movieInfoContent.style.display !== 'none'){
        movieInfoContent.style.display = 'none';
    } else{
        movieInfoContent.style.display = 'block';
    }
})


btnTrailerClosed.addEventListener("click", function(){
    trailerContainer.style.display = "none";
})

