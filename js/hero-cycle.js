// Drop your own hero images into /images and list them here with the site
// each one came from. The two layers crossfade between them on a timer.
const heroSlides = [
  { src: "images/hero-1.jpg", credit: "istockphoto.com" },
  { src: "images/hero-2.jpg", credit: "istockphoto.com" },
  { src: "images/hero-3.jpg", credit: "istockphoto.com" }
];

const CYCLE_MS = 5000;

const layerA = document.getElementById("heroLayerA");
const layerB = document.getElementById("heroLayerB");
const heroCredit = document.getElementById("heroCredit");

let index = 0;
let showingA = true;

function showSlide(layer, slide) {
  layer.style.backgroundImage = `url("${slide.src}")`;
  if (heroCredit) heroCredit.textContent = slide.credit ? `Photo: ${slide.credit}` : "";
}

if (heroSlides.length > 0) {
  showSlide(layerA, heroSlides[0]);
  layerA.classList.add("is-active");
}

if (heroSlides.length > 1) {
  setInterval(() => {
    index = (index + 1) % heroSlides.length;
    const nextLayer = showingA ? layerB : layerA;
    const currentLayer = showingA ? layerA : layerB;

    showSlide(nextLayer, heroSlides[index]);
    nextLayer.classList.add("is-active");
    currentLayer.classList.remove("is-active");

    showingA = !showingA;
  }, CYCLE_MS);
}
