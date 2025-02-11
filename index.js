// Get DOM elements
const redBtn = document.querySelector('.red');
const blueBtn = document.querySelector('.blue');
const greenBtn = document.querySelector('.green');
const yellowBtn = document.querySelector('.yellow');
const startBtn = document.querySelector('.start');
const levelDisplay = document.querySelector('.level');

// Game variables
let gamePattern = [];
let userPattern = [];
let level = 0;
let gameStarted = false;
let isPlaying = false;

// Colors array
const colors = ['red', 'blue', 'green', 'yellow'];

// Start game
startBtn.addEventListener('click', () => {
    if (!gameStarted && !isPlaying) {
        startGame();
    }
});

function startGame() {
    gameStarted = true;
    gamePattern = [];
    userPattern = [];
    level = 0;
    nextSequence();
}

// Generate next sequence
function nextSequence() {
    userPattern = [];
    level++;
    levelDisplay.textContent = `Level : ${level}`;
    
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    
    isPlaying = true;
    playSequence();
}

// Play the sequence
function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        activateButton(gamePattern[i]);
        i++;
        if (i >= gamePattern.length) {
            clearInterval(interval);
            isPlaying = false;
        }
    }, 800);
}

// Activate button
function activateButton(color) {
    const button = document.querySelector(`.${color}`);
    button.style.opacity = '0.5';
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
    }, 400);
}

// Handle user clicks
[redBtn, blueBtn, greenBtn, yellowBtn].forEach(btn => {
    btn.addEventListener('click', function() {
        if (gameStarted && !isPlaying) {
            const userColor = this.classList[0];
            userPattern.push(userColor);
            
            // Visual feedback for user click
            this.style.opacity = '0.5';
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 200);
            
            checkAnswer(userPattern.length - 1);
        }
    });
});

// Check answer
function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            isPlaying = true;
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

// Game over
function gameOver() {
    levelDisplay.textContent = 'Game Over!';
    // document.body.style.backgroundColor = '#ff4444';
    
    setTimeout(() => {
        document.body.style.backgroundColor = 'rgb(48, 48, 58)';
    }, 200);
    
    gameStarted = false;
    startBtn.textContent = 'Restart';
}