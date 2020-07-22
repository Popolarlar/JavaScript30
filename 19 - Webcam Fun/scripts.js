const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      // [Deprecation] URL.createObjectURL with media streams is deprecated and will be removed in M68, around July 2018.
      // video.src = window.URL.createObjectURL(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      alert("Please allow camera access to proceed");
    });
}

function paintToCanavas() {
  const { videoWidth: width, videoHeight: height } = video;
  // Make sure the canvas has the same size as the video resource
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // Get the pixels
    let pixels = ctx.getImageData(0, 0, width, height);

    // Mess with them
    // pixels = redEffect(pixels);

    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.1;
    pixels = greenScreen(pixels);

    // Put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}
function takePhoto() {
  // Play the sound
  snap.currentTime = 0;
  snap.play();

  // Take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");

  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "pretty");
  link.innerHTML = `<img src=${data} alt="Pretty girl"/>`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; //red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; //red
    pixels.data[i + 500] = pixels.data[i + 1]; //green
    pixels.data[i - 550] = pixels.data[i + 2]; //blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};
  document
    .querySelectorAll(".rgb input")
    .forEach((input) => (levels[input.name] = input.value));

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0]; //red
    green = pixels.data[i + 1]; //green
    blue = pixels.data[i + 2]; //blue
    alpha = pixels.data[i + 3]; //alpha

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // Take it out
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();
video.addEventListener("canplay", paintToCanavas);
