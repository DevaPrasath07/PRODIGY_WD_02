let startTime;
let updatedTime;
let difference;
let interval;
let savedTime = 0;
let running = false;

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');
const circle = document.getElementById('circle');

startButton.addEventListener('click', () => {
    circle.classList.add('running');
});
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        interval = setInterval(updateTime, 10);
        running = true;
        circle.classList.remove('paused', 'reset');
        circle.classList.add('running');
    }
}

function pause() {
    if (running) {
        clearInterval(interval);
        savedTime = difference;
        running = false;
        circle.classList.remove('running');
        circle.classList.add('paused');
    }
}

function reset() {
    clearInterval(interval);
    running = false;
    savedTime = 0;
    difference = 0;
    timeDisplay.innerHTML = "00:00.00";
    circle.style.borderColor = "#333";
    circle.classList.remove('running', 'paused');
    circle.classList.add('reset');
    lapsList.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor(difference / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    const formattedTime = 
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);

    timeDisplay.innerHTML = formattedTime;

    // Change the border color gradually based on time
    const colorValue = (milliseconds / 1000) * 255;
    circle.style.borderColor = `rgb(${colorValue}, ${255 - colorValue}, 150)`;
}

function recordLap() {
    if (running) {
        const lapTime = timeDisplay.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}
