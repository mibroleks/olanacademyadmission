/* --- SLIDESHOW WITH AUTO-PLAY --- */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) { showSlides(slideIndex += n); }
function currentSlide(n) { showSlides(slideIndex = n); }

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
  for (i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active",""); }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

  clearTimeout(window.slideTimeout);
  window.slideTimeout = setTimeout(() => plusSlides(1), 5000);
}

/* --- LIGHTBOX --- */
let lightboxIndex = 0;
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("lightbox-caption");

const slidesArray = [
  {src:"images/play.jpg", alt:"Playground"},
  {src:"images/chemistrylab2.jpg", alt:"Chemistry Lab"},
  {src:"images/classroom.jpg", alt:"Classroom"},
  {src:"images/home.jpg", alt:"H/Econs Lab"},
  {src:"images/ictlab.jpg", alt:"ICT Lab"},
  {src:"images/music.jpg", alt:"Music Room"}
];

function openLightbox(n){
  lightbox.style.display="block";
  lightboxIndex = n;
  updateLightbox();
}
function closeLightbox(){ lightbox.style.display="none"; }
function changeLightbox(n){
  lightboxIndex += n;
  if(lightboxIndex < 0) lightboxIndex = slidesArray.length-1;
  if(lightboxIndex >= slidesArray.length) lightboxIndex = 0;
  updateLightbox();
}
function updateLightbox(){
  lightboxImg.src = slidesArray[lightboxIndex].src;
  caption.innerText = slidesArray[lightboxIndex].alt;
}

// --- Mobile swipe support for lightbox ---
let touchStartX = 0;

lightbox.addEventListener('touchstart', function(e){
  touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox.addEventListener('touchend', function(e){
  let touchEndX = e.changedTouches[0].screenX;
  let diffX = touchEndX - touchStartX;

  if(diffX > 50){ changeLightbox(-1); }   // swipe right
  else if(diffX < -50){ changeLightbox(1); } // swipe left
}, false);
