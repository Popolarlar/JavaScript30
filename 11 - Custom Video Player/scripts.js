const video = document.querySelector("video");
const playButton = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const progress = document.querySelector(".progress");
const progressBar = progress.querySelector(".progress__filled");
const sliders = document.querySelectorAll("input[type = range]");
const fullscreenButton = document.querySelector(".fullscreen");

// addEventListener("keyup", playPause);
video.addEventListener("click", playPause);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", updateProgressBar);
playButton.addEventListener("click", playPause);
sliders.forEach((slider) => {
  slider.addEventListener("change", updateRange);
  slider.addEventListener("input", updateRange);
});
skipButtons.forEach((skipButton) => {
  skipButton.addEventListener("click", playSkip);
});
progress.addEventListener("click", scrub);
let isDragging = false;
progress.addEventListener("mousedown", () => {
  isDragging == true;
});
progress.addEventListener("mouseup", () => {
  isDragging == false;
});
progress.addEventListener("mousemove", (e) => isDragging && scrub(e));
fullscreenButton.addEventListener("click", handleFullscreen);

function playPause(e) {
  // if (e.type === "keyup" && e.keycode != 33) {
  //   return;
  // }
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  playButton.textContent = this.paused ? "❚ ❚" : "►";
}

function updateProgressBar() {
  const percentage = (this.currentTime / this.duration) * 100;
  progressBar.style.flexBasis = percentage + "%";
}

function playSkip(e) {
  // video.pause();
  video.currentTime += parseFloat(e.target.dataset.skip);
  // video.play();
}

function updateRange() {
  video[this.name] = this.value;
}

function scrub(e) {
  console.log("dragging");
  const scrubTime = video.duration * (e.offsetX / this.offsetWidth);
  video.currentTime = scrubTime;
}
function handleFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    /* Firefox */
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    /* IE/Edge */
    video.msRequestFullscreen();
  }
}
