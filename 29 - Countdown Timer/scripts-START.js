const buttons = document.querySelectorAll(".timer__button");
const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const customForm = document.querySelector("#custom");
const customInput = document.querySelector("input[name=minutes]");

let countdown;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    timer(e.target.dataset.time);
  });
});

customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const sec = this.minutes.value.replace(/\D/g, "") * 60;
  if (sec > 0) {
    timer(sec);
  }
  this.reset();
});

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000; // millisecond

  // Display time left immediately
  displayTimeLeft(seconds);

  // Display end time
  displayEndTime(then);

  // Every second, display the amount of time left
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // Stop checksum
    if (secondsLeft <= 0) {
      clearInterval(countdown);
    }

    // Diaplay
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  let sec = seconds % 60;
  const min = (seconds - sec) / 60;
  const display = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  timeLeft.textContent = display;
  document.title = display;
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const adjustedHour =
    end.getHours() > 12 ? end.getHours() - 12 : end.getHours();
  const adjustedMinute =
    end.getMinutes() < 10 ? "0" + end.getMinutes() : end.getMinutes();

  endTime.textContent = `Be Back at ${adjustedHour}:${adjustedMinute}`;
}
