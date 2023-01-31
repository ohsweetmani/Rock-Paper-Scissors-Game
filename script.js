function rockMove() {
    playRound('rock');
    return 'rock';
}

const rockElem = document.getElementById("youRock");
rockElem.addEventListener('click', rockMove);

function scissorMove() {
    playRound('scissors');
    return 'scissors';
} 

const scissorElem = document.getElementById("youScissor");
scissorElem.addEventListener('click', scissorMove);

function paperMove() {
    playRound('paper');
    return 'paper';
}

const paperElem = document.getElementById("youPaper");
paperElem.addEventListener('click', paperMove);

var currRound = 1;
var rounds = 3;

var yourScore = 0;
var compScore = 0; 

const buttonElem = document.getElementById('next-round-btn');

function playRound(yourMove) {

  if (currRound > rounds) {
    alert("Please refresh the page to start a new game!");
    return;
  }

  //Check if next round button was clicked..
  let checkClick = window.getComputedStyle(buttonElem).getPropertyValue('display');
  if (checkClick == 'block') {
    alert("You need to start next round before continuing game.");
    return;
  }

  //Apply yellow background to your move
  let yourMoves = new Map([
    ['rock', rockElem],
    ['paper', paperElem],
    ['scissors', scissorElem]
  ]);
  moveElem = yourMoves.get(yourMove);
  moveElem.classList.add('yellowBg');

  //Generate computer move
  let compMove = moveComputer();
  
  //Compare your move and computer move
  let result = "";
  if (yourMove == compMove) {

    yourScore += 1;
    compScore += 1;
    result = "tie"; 
    
  } else if ( (yourMove == 'rock' & compMove == 'scissors') ||
             (yourMove == 'paper' & compMove == 'rock') || 
             (yourMove == 'scissors' & compMove == 'paper') ){
    
    yourScore += 1;
    result = "You win!";

  } else {

    compScore += 1;
    result = "You lose!";
    
  }

  displayRoundResults(result);
 
  //Find Overall Winner
  if (currRound == rounds) {
    declareWinner();
    currRound += 1; //Increment so player can't play past 3 rounds.
    return;
  }

  currRound += 1;

  //Show next round button
  buttonElem.style.display =  "block" ;

  return currRound;
}

function moveComputer() {
    let computerOptions = ['compRock', 'compPaper', 'compScissors'];
    let optionPos = Math.floor(Math.random()*3);
    let move = computerOptions[optionPos];

    let moveElem = document.getElementById(move);
    moveElem.classList.add('yellowBg');

    //Get move in general terms
    let compMoves = new Map([
        ['compRock', 'rock'],
        ['compPaper', 'paper'],
        ['compScissors', 'scissors']
    ]);

    move = compMoves.get(move);
    return move;
}

function displayRoundResults(result) {
    document.getElementById('yourScore').textContent = yourScore;
    document.getElementById('compScore').textContent = compScore;
    
    //Make Round result visible
    document.getElementById('roundResultWrapper').style.display =  "block" ;

    roundResultElem = document.getElementById('roundResult');
    roundResultElem.textContent = currRound + ": " + result;
}


function resetRound() {
    //Resets icons for next round 
    let yellowElem = document.querySelectorAll('.yellowBg');
    for (let elem of yellowElem) {
        elem.classList.remove('yellowBg');
    }

    //Remove round result from view & remove button for next round
    document.getElementById('roundResultWrapper').style.display =  "none" ;
    document.getElementById('next-round-btn').style.display = "none";

    //Update current round #
    document.getElementById('currRound').textContent = "Current Round: " + currRound;
}

//Event Listener for Next Round Button
buttonElem.addEventListener("click", resetRound);

function declareWinner() {
    document.getElementById('winnerWrapper').style.display =  "block" ;
    winnerElem = document.getElementById('winner');
    if (yourScore > compScore) {
        winnerElem.textContent = "You Win!!";
    } else if (yourScore == compScore) {
        winnerElem.textContent = "It's a tie!";
    } else {
        winnerElem.textContent = "You lose!!";
    }
}

