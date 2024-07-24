let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('laps');

function updateTime() {
  elapsedTime = Date.now() - startTime;

  // Calculate milliseconds without dividing by 100
  let milliseconds = elapsedTime % 1000; // Get the remainder after dividing by 1000
  milliseconds = milliseconds.toString().padStart(3, '0'); // Pad with zeros to ensure 3 digits

  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let hours = Math.floor((elapsedTime / (1000 * 60 * 60)));

  display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;

}

function startStop() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
    startBtn.textContent = 'Start';
    lapBtn.disabled = true;
  } else {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    isRunning = true;
    startBtn.textContent = 'Stop';
    lapBtn.disabled = false;
  }
}

function takeLap() {
  if (isRunning) {
    let lapTime = elapsedTime;
    laps.push(lapTime);
    let newLap = document.createElement('li');
    newLap.textContent = `Lap ${laps.length}: ${display.textContent}`;
    lapsList.appendChild(newLap);
  }
}

function reset() {
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = '00:00:00.000';
  laps = [];
  lapsList.innerHTML = '';
  startBtn.textContent = 'Start';
  lapBtn.disabled = true;
}

startBtn.addEventListener('click', startStop); // Assuming you want to attach the click event here
lapBtn.addEventListener('click', takeLap);  // Assuming you want to attach the click event here
resetBtn.addEventListener('click', reset);  // Assuming you want to attach the click event here