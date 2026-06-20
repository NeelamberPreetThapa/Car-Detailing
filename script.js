const video = document.getElementById("bg-video");

// 1. Force Video Reset & Cache Busting on every single reload
window.addEventListener("DOMContentLoaded", () => {
  const currentSrc = video.src.split('?')[0];
  // Append fresh timestamp query string to prevent browser caching tracking loops
  video.src = `${currentSrc}?t=${new Date().getTime()}`;
  video.load();
  video.currentTime = 0;
});

// 2. Play video normally but ONLY after user initiates scrolling
let hasPlayed = false;

window.addEventListener("scroll", () => {
  if (!hasPlayed && window.scrollY > 10) {
    video.play().then(() => {
      hasPlayed = true;
    }).catch(err => console.log("Interaction required:", err));
  }
});

// 3. String Interactivity Animation (GSAP Optional Micro-Wobble Accent)
// Body section ke strings ko scroll karte waqt dynamically distort karne ke liye:
gsap.to(".main-content::before", {
  x: 30,
  duration: 3,
  skewX: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Existing scroll listener ke theek niche yeh add kar do
window.addEventListener("touchstart", () => {
  if (!hasPlayed) {
    video.play().then(() => {
      hasPlayed = true;
    }).catch(err => console.log("Touch required:", err));
  }
}, { once: true }); // 'once: true' ensures it only fires the very first time