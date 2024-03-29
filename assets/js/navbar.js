//Menu Toggle
const navMenu = document.querySelector(".header-nav-menu");
const navMenu2 = document.getElementById("header-nav-menu");
const header = document.querySelector(".header");
const menuToggle = document.querySelector(".header-menu-toggle");
const movie = document.querySelector(".dropdown");
const tv = document.querySelector(".tv-dropdown");
const people = document.querySelector(".people-dropdown");


navMenu.addEventListener("click", function(){
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
});

menuToggle.addEventListener("click", function(){
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    header.classList.toggle("active");
});


//ScrollEffect
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 0);
});

movie.addEventListener("click", function(){
    if(movie.classList.toggle("dropdown-active")){
        tv.classList.remove('dropdown-active')
        people.classList.remove('dropdown-active')
    }

})

tv.addEventListener("click", function(){
    if(tv.classList.toggle("dropdown-active")){
        movie.classList.remove('dropdown-active')
        people.classList.remove('dropdown-active')
    }
})

people.addEventListener("click", function(){
    if(people.classList.toggle("dropdown-active")){
        movie.classList.remove('dropdown-active')
        tv.classList.remove('dropdown-active')
    }
})


