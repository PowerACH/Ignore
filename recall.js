//Match Counter//
let matchCards = 0;
// let match = document.getElementById('matches');
let pOneMatch = document.getElementById('pOne');
let pTwoMatch = document.getElementById('pTwo');

//Moves Counter//
let moves = 0;
// let moveCounter = document.getElementById('moves');

//Start Timer on first flip//
let clock;
function moveFunc() {
    moves += 1
    // moveCounter.innerHTML = moves;
    if (moves == 1) {
        clock = setInterval(currentTime, 1000)
    }
}

//Game Timer//
let seconds = 00;
let s = document.getElementById('seconds');
let m = document.getElementById('minutes');
function currentTime() {
    ++seconds
    s.innerHTML = formatt(seconds % 60)
    m.innerHTML = formatt(Math.trunc(seconds / 60))
}

//Game Timer Formatting//
function formatt(x) {
    let xvalue = x + "";
    if (xvalue.length < 2) {
        return "0" + xvalue;
    } else {
        return xvalue;
    }
}

//Stop the Clock Interval//
function stopClock() {
    clearInterval(clock)
    gameOver()
}

//Timer Reset//
function timerReset() {
    seconds = 0;
    minute = 0;
}

//Start Game Button
// function startGame() {
//     window.document.getElementById("overlay").classList.toggle('after')//hide Modal
//     window.document.getElementById("board").classList.toggle('noModal')//show board
//     window.document.getElementById("scorebox1").classList.toggle('after')//show scorebox
// }



//After all cards matched//
function gameOver() {
    if (playerOne.matches > playerTwo.matches) {
        alert("Player One Wins!")
    } else if (playerTwo.matches > playerOne.matches) {
        alert("Player Two Wins")
    }
}

let playerOne = {
    turn: true,
    matches: 0
}

let playerTwo = {
    turn: false,
    matches: 0
}

// ******************Match Board Functions*****************//
//card flip
const memoryCard = window.document.querySelectorAll(".card");//selects card div


let flippedCard = false;
let firstChoice, secondChoice;
let stopBoard = false;//disable cards while picking 

function flipCard() {
    moveFunc()
    if (stopBoard) {
        return
    }
    if (this === firstChoice) {
        return
    }
    this.classList.toggle('flip');//Toggles between a class name for an element. 

    if (!flippedCard) {
        //first card choice
        flippedCard = true;
        firstChoice = this;

        return
        //second card choice
    } else {
        flippedCard = false;
        secondChoice = this;

        matched()
    }
}

function matched() {
    //when cards match, keep cards open
    if (firstChoice.dataset.name === secondChoice.dataset.name) { //disable cards

        // matchCards += 1;
        // match.innerHTML = matchCards;
        firstChoice.removeEventListener('click', flipCard)
        secondChoice.removeEventListener('click', flipCard)
        resetBoard()
        if (playerOne.turn == true) {
            playerOne.matches += 1
            pOneMatch.innerHTML = playerOne.matches
        }
        if (playerTwo.turn == true) {
            playerTwo.matches += 1
            pTwoMatch.innerHTML = playerTwo.matches
        }
        if (matchCards === 8) {
            alert("Game Over!")
        }


        //unflip cards when not a match
    } else {
        stopBoard = true;
        setTimeout(() => {
            firstChoice.classList.remove('flip')
            secondChoice.classList.remove('flip')
            stopBoard = false;
        }, 1000)
        playerOne.turn = !playerOne.turn
        playerTwo.turn = !playerTwo.turn
    }
}


function resetBoard() {
    flippedCard = false
    stopBoard = false
    firstChoice = null
    secondChoice = null

}

// shuffles cards after each reload
(function shuffle() {
    memoryCard.forEach(card => {
        let random = Math.floor(Math.random() * 16)
        card.style.order = random;
    })
})()
// ///////////////////////////////////////////


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}







///////////////////////////////////////////
//allows cards to be clickable
memoryCard.forEach(card => card.addEventListener("click", flipCard))


