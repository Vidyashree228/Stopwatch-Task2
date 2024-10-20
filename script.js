let startTime;
let updatedTime;
let difference;
let timerId;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerId = setInterval(update, 1000);
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(timerId);
        running = false;
        difference = new Date().getTime() - startTime;
    }
}

function reset() {
    clearInterval(timerId);
    running = false;
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    lapCounter = 1;
    display.innerHTML = "00:00:00";
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `Lap ${lapCounter++}: ${formatTime(new Date().getTime() - startTime)}`;
        laps.appendChild(lapTime);
    }
}

function update() {
    updatedTime = new Date().getTime() - startTime;
    display.innerHTML = formatTime(updatedTime);
}

function formatTime(time) {
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);

    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds
    );
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
