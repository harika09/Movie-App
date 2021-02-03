//Menu Toggle
const navMenu = document.querySelector(".header-nav-menu");
const header = document.querySelector(".header");
const menuToggle = document.querySelector(".header-menu-toggle");

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