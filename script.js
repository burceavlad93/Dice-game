'use strict'
//-------------------------------------------------------------VARIABLES--------------------------------------------------------------------------------------
let point = 0;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;
let currentPlayer = 1;
let gameOn = true;
const targetScore = 30;
//-------------------------------------------------------------ELEMENTS---------------------------------------------------------------------------------------
const player1Score = document.getElementById('score--1');
const player2Score = document.getElementById('score--2');
const player1Points = document.getElementById('current--1');
const player2Points = document.getElementById('current--2');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const dice = document.querySelector('.dice');
//-------------------------------------------------------------BUTTONS----------------------------------------------------------------------------------------
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
//-------------------------------------------------------------DEFAULT CONFIGURATION--------------------------------------------------------------------------
/*This functions sets all elements to their default state*/
const startGame = function () {
    point = 0;
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    pointsPlayer1 = 0;
    pointsPlayer2 = 0;
    currentPlayer = 1;
    gameOn = true;
    player1Score.textContent = '0';
    player2Score.textContent = '0';
    player1Points.textContent = '0';
    player2Points.textContent = '0';
    dice.src = `dice-5.png`;
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
}
//-------------------------------------------------------------GAME FUNCTIONS---------------------------------------------------------------------------------

const player1CurrentPoints = function (diceNumber) {                            // Keeps track and updates Player 1s current points;
    if (diceNumber !== 1) {                                                     // As long as the "dice" is not 1
        pointsPlayer1 += diceNumber;                                            // The respective dice value is added to Player 1s point count
        player1Points.textContent = pointsPlayer1;                              // Point count is updated;
    } else {                                                                    // If the dice rolls a 1
        ++currentPlayer;                                                        // Move from Player 1 to Player 2
        pointsPlayer1 = 0;                                                      // Lose all current points
        player1Points.textContent = '0';                                        // Set current points back to 0
        player1.classList.toggle('player--active');                             // Remove active Player class from Player 1
        player2.classList.toggle('player--active');                             // Add active Player class to Player 2
    }
}

const player1ScoreUpdate = function () {                                        // Keeps track and updates Player 1s score
    ++currentPlayer;                                                            // When score is updated move from Player 1 to Player 2
    scorePlayer1 += pointsPlayer1;                                              // Add the current points value to the total score
    pointsPlayer1 = 0;                                                          // Reset points value back to 0
    player1Score.textContent = scorePlayer1;                                    // Update Player 1 score
    player1Points.textContent = '0';                                            // Update Player 1 current points back to 0;
    player1.classList.toggle('player--active');                                 // Remove active Player class from Player 1
    player2.classList.toggle('player--active');                                 // Add active Player class to Player 2
}

const player2CurrentPoints = function (diceNumber) {                            // Keeps track and updates Player 2s current points;
    if (diceNumber !== 1) {                                                     // As long as the "dice" is not 1
        pointsPlayer2 += diceNumber;                                            // The respective dice value is added to Player 2s point count
        player2Points.textContent = pointsPlayer2;                              // Point count is updated;
    } else {                                                                    // If the dice rolls a 1
        --currentPlayer;                                                        // Move from Player 2 to Player 1
        pointsPlayer2 = 0;                                                      // Lose all current points
        player2Points.textContent = '0';                                        // Set current points back to 0
        player1.classList.toggle('player--active');                             // Add active Player class from Player 2
        player2.classList.toggle('player--active');                             // Remove active Player class to Player 1
    }
}

const player2ScoreUpdate = function () {                                        // Keeps track and updates Player 2s score
    --currentPlayer;                                                            // When score is updated move from Player 2 to Player 1
    scorePlayer2 += pointsPlayer2;                                              // Add the current points value to the total score
    pointsPlayer2 = 0;                                                          // Reset points value back to 0
    player2Score.textContent = scorePlayer2;                                    // Update Player 2 score
    player2Points.textContent = '0';                                            // Update Player 2 current points back to 0;
    player1.classList.toggle('player--active');                                 // Add active Player class from Player 2
    player2.classList.toggle('player--active');                                 // Remove active Player class to Player 1
}

const winner = function () {                                                    // This function adds winner class to Player
    if (scorePlayer1 >= targetScore) {                                          // If Player 1s score is >= than the targer score
        player1.classList.add('player--winner');                                // Add winner class
        gameOn = false;                                                         // Stop game
    }

    if (scorePlayer2 >= targetScore) {                                          // If Player 2s score is >= than the targer score        
        player2.classList.add('player--winner');                                // Add winner class
        gameOn = false;                                                         // Stop game
    }
}

startGame();                                                                    // Default settings

rollDice.addEventListener('click', function () {                                // When the "rollDice" button is pressed
    if (gameOn) {                                                               // If the game is running
        point = Math.trunc(Math.random() * 6) + 1;                              // Generate random number
        dice.src = `dice-${point}.png`;                                         // Use generated number as index for the dice .png file

        if (currentPlayer === 1) {                                              // If current Player is Player 1
            player1CurrentPoints(point);                                        // Call the current points function for Player 1
        } else {                                                                // If current Player is not Player 1
            player2CurrentPoints(point);                                        // Call the curren point function for Player 2
        }
    }
});

hold.addEventListener('click', function () {                                    // When the "hold" button is pressed
    if (gameOn) {                                                               // If the game is running
        if (currentPlayer === 1) {                                              // If current Player is Player 1
            player1ScoreUpdate();                                               // Call score update function for Player 1
        } else {                                                                // If current Player is not Player 1
            player2ScoreUpdate();                                               // Call score update function for Player 2
        }
        winner();                                                               // Call winner function and check if target score has been reached
    }
})

newGame.addEventListener('click', function () {                                 // When the "newGame" button is pressed
    startGame();                                                                // Loads default settings
    player1.classList.remove('player--winner');                                 // Remove winner class from Player 1
    player2.classList.remove('player--winner');                                 // Remove winner class from Player 2
})
