const video = document.querySelector("video");
const playButtons = document.querySelectorAll(".player__button");

addEventListener("keyup", playPause);

playButtons.forEach((playButton) => {
  if (playButton.classList.contains("toggle")) {
    playButton.addEventListener("click", playPause);
  } else {
    playButton.addEventListener("click", playSkip);
  }
});

function playPause(e) {
  if (e.type === "keyup" && e.keycode != 33) {
    return;
  }
  video.paused ? video.play() : video.pause();
}

function playSkip(e) {
  video.pause();
  video.currentTime = video.currentTime + parseFloat(e.target.dataset.skip);
  video.play();
}

const videoProgress = document.querySelector(".progress__filled");

video.addEventListener("timeupdate", () => {
  var percentage =
    ((video.currentTime / video.duration) * 100).toFixed(0) + "%";
  videoProgress.style.flexBasis = percentage;
});

console.log(video.currentTime);

const volumeSlider = document.querySelector("input[name=volume]");
volumeSlider.addEventListener("change", changeVolume);
volumeSlider.addEventListener("input", changeVolume);

function changeVolume(e) {
  video.volume = parseFloat(e.target.value);
}

const speedSlider = document.querySelector("input[name=playbackRate]");
speedSlider.addEventListener("change", changeSpeed);
speedSlider.addEventListener("input", changeSpeed);

function changeSpeed(e) {
  video.playbackRate = parseFloat(e.target.value);
}
