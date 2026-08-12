// Picks one story at random to spotlight in the hero's "Pick a Random Story"
// card. Listed in shelf order — story1 through story8.
const featuredStories = [
  {
    title: "The Christmas Truce of 1914",
    blurb: "Soldiers on the Western Front laid down their rifles for one unordered night of peace.",
    image: "images/web-xmas-truce-1-ap.avif",
    link: "story1.html"
  },
  {
    title: "Apollo-Soyuz: A Handshake in Orbit",
    blurb: "At the height of the Cold War, two rival space programs docked in orbit and shook hands.",
    image: "images/10-apollo-soyuz-docking-1975.jpg__1536x0_q75_crop-scale_subsampling-2_upscale-false.jpg",
    link: "story2.html"
  },
  {
    title: "The Fall of the Berlin Wall",
    blurb: "After 28 years of division, strangers from both sides climbed the wall together and tore it down.",
    image: "images/27-BerlinWall-Getty.avif",
    link: "story3.html"
  },
  {
    title: "One Station, Fifteen Nations",
    blurb: "Cold War rivals spent over a decade bolting their separately built modules into a single home in orbit.",
    image: "images/iss_nasa.webp",
    link: "story4.html"
  },
  {
    title: "One Genome, Six Nations",
    blurb: "Scientists on three continents agreed to give away everything they found about human DNA, for free.",
    image: "images/350-51186070485_2703618fdc_o-1-768x512.jpg",
    link: "story5.html"
  },
  {
    title: "The Rescue of the 33",
    blurb: "Engineers and specialists from a dozen countries raced together to save 33 trapped Chilean miners.",
    image: "images/Juan-Illanes-third-Chilean-miner-rescued-October-13-2010.webp",
    link: "story6.html"
  },
  {
    title: "One Flag, Two Koreas",
    blurb: "Two nations still technically at war marched under one flag and skated as one team at the 2018 Olympics.",
    image: "images/4e511782-20ef-41ef-9a3d-3b52d34ba697_38766910.webp",
    link: "story7.html"
  },
  {
    title: "One Disaster, Ninety Nations",
    blurb: "After the Turkey-Syria earthquake, rescue teams arrived from neighbours who hadn't spoken in decades.",
    image: "images/2048c0b1-eb4b-4360-bc7d-6964f1807de1.jpg",
    link: "story8.html"
  }
];

const pick = featuredStories[Math.floor(Math.random() * featuredStories.length)];

document.getElementById("featuredImg").src = pick.image;
document.getElementById("featuredTitle").textContent = pick.title;
document.getElementById("featuredBlurb").textContent = pick.blurb;
document.getElementById("featuredCard").href = pick.link;
