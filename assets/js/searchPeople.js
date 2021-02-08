const  actor = localStorage.getItem("Celebrity");
import API_KEY from "./config.js"
const API_key = API_KEY

const image_path = "https://image.tmdb.org/t/p/w1280";
const castContainer = document.getElementById("cast-list");
const movieContainer = document.getElementById("movies-container");
const movieInfoContent = document.getElementById("movie-info")
const movieDetails = document.getElementById("movie-details");
const btnClosed = document.getElementById("btn-closed");
const search = document.getElementById("search-movies");



getCelebrity().catch(error => {
    console.log(error);
}); ;


async function getCelebrity(){
    movieContainer.innerHTML = "";
    const response  = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${API_key}&language=en-US&query=${actor}&page=1&include_adult=false`);
    console.log(response)
    const Moviedata = await response.json();

    showCelebrity(Moviedata.results)
    //movies = await response.json();
}

/* ========== Celebrity Search ========== */ 
$('.form').submit(function(event){    
    const searchMovies = search.value;
    console.log("Submit")
 if(searchMovies == ""){
      alert('field is empty')
      
    }else{
        location.replace("/assets/people/searchPeople.html");
        localStorage.setItem("Celebrity", searchMovies);
        console.log(searchMovies);
    }
    event.preventDefault();
})

function showCelebrity(person){

    person.forEach((persons) => {
        const { profile_path, name, popularity} = persons; 
        
        const movieEL = document.createElement("div");
        movieEL.classList.add("movies-list");
    
        movieEL.innerHTML = 
         `<img src="${image_path + profile_path}" alt=${name} id="poster" onerror="this.src = '/assets/img/poster-placeholder.svg'">
         
         <div class="movie-title">
         <h3>${name}</h3>
    
         <p class="ratings">${parseInt(popularity.toString().replace('.', ''))}<span class="percent">%</span></p>
         </div>
         `;
      
         movieEL.addEventListener("click", () =>{
            showActorMovieInfo(persons)// it will pass the movie details
            getKnownFor(persons.known_for);
            getMovieId(persons.id)
            movieInfoContent.style.display = "block";
           //console.log(movie.title)
    
       });
    
         movieContainer.appendChild(movieEL);
    
        
    });
}


/* ========== Celebrity List ========== */


function showActorMovieInfo (movie){

    movieDetails.innerHTML = (`
        <div class ="overview-img">
        <img class="desktop-img" src="${image_path + movie.profile_path}" onerror="this.src = '/assets/img/poster-placeholder.svg'">


        </div>
        <div class="overview-text">
        <h2 class="celebrity_name">${movie.name}</h2>

        <div class="overview-details" id="overview-details">

        </div>

        `);


}
/* ========== Celebrity  List END  ========== */

function getKnownFor(known_for){

    const overview_details = document.getElementById("overview-details");

    overview_details.innerHTML = " ";

    known_for.forEach((movie) => {
        const { overview, original_title} = movie; 

      
        const movieEL = document.createElement("div");
        movieEL.classList.add("overview-list");

        movieEL.innerHTML = 
         `
         
         <div class="overview-info">

            <p>${overview}</>
         </div>
         
         `;

         overview_details.appendChild(movieEL);
        
        
    });

    

}

function getMovieId(ID){ //getting the movie ID
    const Id = ID;
    const trailerURL = `https://api.themoviedb.org/3/person/${Id}/combined_credits?api_key=${API_KEY}&language=en-US`
    fetch(trailerURL).then((res) => res.json())
    .then((movieList) =>{
        actorMovieList(movieList.cast)
    }).catch((error)=>{
        console.log(error);
    })
}

function actorMovieList(movieList){
    castContainer.innerHTML = "";
    movieList.forEach((movieLists) =>{
        const { title, poster_path} = movieLists;

        const castList = document.createElement("div");
        castList.classList.add("swiper-slide");

        castList.innerHTML = `

            <img class="actor-img" src="${image_path + poster_path}" onerror="this.src = '/assets/img/poster-placeholder.svg'">
            <h4>${title}</h4>
        `

        castContainer.appendChild(castList);

       // $(".cast-list .swiper-slide").slice(10).remove() // display only 10 div
    })
}




movieInfoContent.style.display = 'none' //Default hidden on page load

btnClosed.addEventListener("click", function(){
    if(movieInfoContent.style.display !== 'none'){
        movieInfoContent.style.display = 'none';
    } else{
        movieInfoContent.style.display = 'block';
    }
})


