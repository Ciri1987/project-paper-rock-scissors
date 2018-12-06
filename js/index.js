'use strict';

var playersWin = 0;
var computersWin = 0;
var rounds;

var output = document.getElementById('output');   
var result = document.getElementById('result');
var numberLimit = document.getElementById('numberLimit');
var gameResult = document.getElementById('gameResult');
var newGame = document.getElementById('newGame');

var paperBtn = document.getElementById('paperBtn');
var rockBtn = document.getElementById('rockBtn');
var scissorsBtn = document.getElementById('scissorsBtn');

paperBtn.addEventListener('click', function() { playerMove('paper');});
rockBtn.addEventListener('click', function() { playerMove('rock');});
scissorsBtn.addEventListener('click', function() { playerMove('scissors');});

function randomNumber() {
  var computerChoices = ['paper', 'rock', 'scissors'];
  var computerMove = Math.floor(Math.random() * 3); 
  return computerChoices[computerMove];
};

function playerMove(playerChoice) {
  
  var computerChoice = randomNumber();
  if (playerChoice === computerChoice) {
    output.innerHTML = 'It is a tie! You played: ' + playerChoice + ' - Computer played: ' + computerChoice;
  } else if (
    ((playerChoice === 'paper') && (computerChoice === 'rock')) 
    || ((playerChoice === 'rock') && (computerChoice === 'scissors')) 
    || ((playerChoice === 'scissors') && (computerChoice === 'paper'))
  ) {
    output.innerHTML = 'YOU WON! You played: ' + playerChoice + ' - Computer played: ' + computerChoice;
    playersWin++;
    result.innerHTML = +playersWin+ ' - ' +computersWin;
  } else {
    output.innerHTML = 'YOU LOST! You played: ' + playerChoice + ' - Computer played: ' + computerChoice;
    computersWin++;
    result.innerHTML = +playersWin+ ' - ' +computersWin;
  }
  gameOver();
};

function roundsLimit() {
  rounds = parseInt(window.prompt('How many rounds would you like to play?'));
  if (rounds > 0) {
    numberLimit.innerHTML = 'Number of rounds: ' +rounds;
  } else if(isNaN(rounds) || rounds <= 0) {
    numberLimit.innerHTML = 'Please write the correct number of rounds';
  }
  return rounds;
};

function gameOver() {
 
  if (playersWin === rounds) {
    gameResult.innerHTML = 'YOU WON THE ENTIRE GAME!';
    disableButton(true);
    
  } else if (computersWin === rounds) { 
    gameResult.innerHTML = 'GAME OVER';
    disableButton(true);
  }
};

function disableButton(state) {                             
  paperBtn.disabled = state;
  rockBtn.disabled = state;
  scissorsBtn.disabled = state;
};
 
newGame.addEventListener('click', function() {
  playersWin = 0;
	computersWin = 0;
  rounds = 0;
  roundsLimit();    
  disableButton(false);
  result.innerHTML = '';     
  gameResult.innerHTML = '';
  output.innerHTML = '';
});

 disableButton(true)