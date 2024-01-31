'use strict';

//PRELOAD 
//loading will be end after document is loaded

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function(){
    setTimeout(()=> {
        preloader.classList.add("loaded");
        document.body.classList.add("loaded");
    }, 1000);
}); 
 
//add event listeners on multiple elements

const addEventOnElements = function(elements, eventType, callback) {
    for(let i=0, len=elements.length; i<len; i++){
        elements[i].addEventListener(eventType, callback);
    }
}

//navbar

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");  // x icon  // hamburger  // toggles when pressed anywhere in background screen
const overlay = document.querySelector("[data-overlay]");  

const toggleNavbar = function() {
    navbar.classList.toggle("active");  
    overlay.classList.toggle("active");  // black screen background when menu is selected
    document.body.classList.toggle("nav-active");  // to hide the background content when navbar is present
}

addEventOnElements(navTogglers, "click", toggleNavbar);

//header and back-to-top

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");


let lastScrollPos = 0;

const hideHeader = function() {  // it gets called only after 50px
    const isScrollBottom = lastScrollPos < window.scrollY;;
    if(isScrollBottom) {
        header.classList.add("hide");  // .header.hide activates when it reaches >= 50px
    }
    else {
        header.classList.remove("hide");
    }

    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function() {
    if(this.window.scrollY >= 50) {  // 50px
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    }
    else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
})

//hero section

const heroSlider = document.querySelector("[data-hero-slider]");  /* ul */
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");  /* li */
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function() {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function() {
    if(currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    }
    else {
        currentSlidePos++;
    }
   
    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function() {
    if(currentSlidePos <= 0) {
        currentSlidePos  = heroSliderItems.length - 1;
    }
    else {
        currentSlidePos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

//auto slide

let autoSlideInterval;

const autoSlide = function() {
    autoSlideInterval = setInterval(function() {
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function() {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);

/* Parallax Effect */
 
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function(event) {
    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    //reverse the number ex: 20 --> -20, -5 --> 5
    x = x - (x * 2);
    y = y - (y * 2);

    for(let i=0, len = parallaxItems.length; i < len; i++) {  
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }
});


