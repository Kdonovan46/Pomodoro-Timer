let timeLeft;
let timerId = null;
let isRestMode = false;
let workTimeLeft = 25 * 60; // 25 minutes in seconds
let restTimeLeft = 5 * 60; // 5 minutes in seconds

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const restBtn = document.getElementById('restBtn');
const sleepingPerson = document.querySelector('.sleeping-person');

// Typing Animation
const text = "Pomodoro Timer";
const typingText = document.querySelector('.typing-text');
const cursor = document.querySelector('.cursor');

function typeText() {
    let currentIndex = 0;
    
    function type() {
        if (currentIndex < text.length) {
            typingText.textContent += text[currentIndex];
            currentIndex++;
            setTimeout(type, 100); // Adjust speed by changing this value (in milliseconds)
        }
    }
    
    type();
}

// Start typing animation when the page loads
document.addEventListener('DOMContentLoaded', typeText);

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                if (isRestMode) {
                    isRestMode = false;
                    timeLeft = workTimeLeft;
                    restBtn.textContent = 'Rest';
                    updateDisplay();
                }
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
}

function toggleRest() {
    stopTimer();
    isRestMode = !isRestMode;
    if (isRestMode) {
        timeLeft = restTimeLeft;
        restBtn.textContent = 'Work';
        sleepingPerson.style.display = 'block';
        setTimeout(() => sleepingPerson.classList.add('visible'), 10);
    } else {
        timeLeft = workTimeLeft;
        restBtn.textContent = 'Rest';
        sleepingPerson.classList.remove('visible');
        setTimeout(() => sleepingPerson.style.display = 'none', 300);
    }
    updateDisplay();
}

// Initialize
timeLeft = workTimeLeft;
updateDisplay();

// Event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
restBtn.addEventListener('click', toggleRest); 