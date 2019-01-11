'use strict';

var params = {
  playersWin: 0,
  computersWin: 0,
  rounds: 0,
  roundResults: []
}

var output = document.getElementById('output');
var result = document.getElementById('result');
var numberLimit = document.getElementById('numberLimit');
var gameResult = document.getElementById('gameResult');
var newGame = document.getElementById('newGame');
var roundsModal = document.getElementById('roundsModal');
var hideModalbtn = document.querySelector('.hide_modal');

var paperBtn = document.getElementById('paperBtn');
var rockBtn = document.getElementById('rockBtn');
var scissorsBtn = document.getElementById('scissorsBtn');

paperBtn.addEventListener('click', function () {
  playerMove('paper');
});
rockBtn.addEventListener('click', function () {
  playerMove('rock');
});
scissorsBtn.addEventListener('click', function () {
  playerMove('scissors');
});

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
    ((playerChoice === 'paper') && (computerChoice === 'rock')) ||
    ((playerChoice === 'rock') && (computerChoice === 'scissors')) ||
    ((playerChoice === 'scissors') && (computerChoice === 'paper'))
  ) {
    output.innerHTML = 'YOU WON! You played: ' + playerChoice + ' - Computer played: ' + computerChoice;
    params.playersWin++;
    result.innerHTML = +params.playersWin + ' - ' + params.computersWin;
  } else {
    output.innerHTML = 'YOU LOST! You played: ' + playerChoice + ' - Computer played: ' + computerChoice;
    params.computersWin++;
    result.innerHTML = +params.playersWin + ' - ' + params.computersWin;
  }
  saveRoundResult();
  gameOver();
};

function roundsLimit() {
  params.rounds = parseInt(window.prompt('How many rounds would you like to play?'));
  if (params.rounds > 0) {
    numberLimit.innerHTML = 'Number of rounds: ' + params.rounds;
  } else if (isNaN(params.rounds) || params.rounds <= 0) {
    numberLimit.innerHTML = 'Please write the correct number of rounds';
  }
  return params.rounds;
};

function saveRoundResult() {
  params.roundResults.push({
    playerScore: params.playersWin,
    computerScore: params.computersWin,
    score: params.playersWin + ':' + params.computersWin
  });
}

function gameOver() {

  if (params.playersWin === params.rounds) {
    gameResult.innerHTML = '<h1>YOU WON THE ENTIRE GAME!</h1>';
    disableButton(true);
    generateResultsTable();
  } else if (params.computersWin === params.rounds) {
    gameResult.innerHTML = 'GAME OVER';
    disableButton(true);
    generateResultsTable();
  }
};

function disableButton(state) {
  paperBtn.disabled = state;
  rockBtn.disabled = state;
  scissorsBtn.disabled = state;
};

newGame.addEventListener('click', function () {
  params.playersWin = 0;
  params.computersWin = 0;
  params.rounds = 0;
  roundsLimit();
  disableButton(false);
  result.innerHTML = '';
  gameResult.innerHTML = '';
  output.innerHTML = '';
});

disableButton(true)

function generateResultsTable() {

  var tbody = '';
  for (var i = 0; i < params.roundResults.length; i++) {
    tbody += `<tr><td>${i+1}</td><td>${params.roundResults[i].playerScore}</td><td>${params.roundResults[i].computerScore}</td><td>${params.roundResults[i].score}</td></tr>`;
  }

  var table = `
    <table>
      <thead><th>ID</th><th>Player points</th><th>Computer points</th><th>Round score</th></thead>
      <tbody>
        ${tbody}
      </tbody>
    </table>
  `;

  roundsModal.querySelector(".modal_body").innerHTML = table;
  roundsModal.style.display = "flex";
}

hideModalbtn.addEventListener("click", function () {
  roundsModal.style.display = "none";
});