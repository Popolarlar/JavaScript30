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

customForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const sec = customInput.value.replace(/\D/g, "") * 60;
  timer(sec);
  customForm.reset();
});

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000; // millisecond

  // Display time left immediately
  displayTimeLeft(seconds);

  // Display end time
  const end = new Date(then);
  endTime.textContent = `${end.getHours()}:${end.getMinutes()}`;

  // Every second, display the amount of time left
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // Stop checksum
    if (secondsLeft < 0) {
      clearInterval(countdown);
    }

    // Diaplay
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  let sec = seconds % 60;
  const min = (seconds - sec) / 60;
  timeLeft.textContent = `${min}:${sec}`;
}
