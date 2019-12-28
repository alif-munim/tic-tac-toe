const cells = document.querySelectorAll(".cell");
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];
var humanPlays = [];
var AIPlays = [];
var interval;
var isWin = [false, []];
var isDraw = false;


function enableListeners() {
    for (let i = 0; i < cells.length; i++) {
        let player = 'X'
        cells[i].addEventListener('click', playerTurn);
    }
}

function disableListeners() {
    for (let i = 0; i < cells.length; i++) {
        let player = 'X'
        cells[i].removeEventListener('click', playerTurn);
    }
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener('click', restartFn);

function restartFn() {

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].setAttribute("style", '')
    }

    humanPlays = [];
    AIPlays = [];
    clearInterval(interval);
    enableListeners();

}


function playerTurn(e) {
    let index = parseInt(e.target.id);
    takeTurn(index, 'X', humanPlays)

    if (!isWin[0] && !isDraw) {
        disableListeners();
        interval = setInterval(AITurn, 1000);    
    }
}

function AITurn() {
    
    let index = Math.floor(Math.random() * 9);

    while (humanPlays.includes(index) || AIPlays.includes(index))
    {
        index = Math.floor(Math.random() * 9);
    }

    takeTurn(index, 'O', AIPlays)
    clearInterval(interval);
    enableListeners();

}


function takeTurn(i, playerMark, playerArray) {

    if (!humanPlays.includes(i) && !AIPlays.includes(i)) {
        cells[i].innerHTML = playerMark;
        playerArray.push(i);
        console.log(playerMark + ": " + playerArray);
    }

    isWin = checkWin(playerArray);
    isDraw = checkDraw();
    
    if (isWin[0]) {
        disableListeners();
        clearInterval(interval);
        gameOver(playerMark, isWin[1]);
    } else if (isDraw) {
        disableListeners();
        clearInterval(interval);
        console.log('Draw!');
    }

}

function checkWin(playerArray) {

    for (var i = 0; i < winCombos.length; i++)
    {
        let thisCombo = winCombos[i];

        for (var j = 0; j < thisCombo.length; j++){
            if (playerArray.includes(thisCombo[j])) {
                isWin[0] = true;
            } else {
                isWin[0] = false;
                break;
            }
        }

        if (isWin[0]) {
            isWin[1] = thisCombo;
            return isWin;
        }
    }

    return isWin;
}

function checkDraw() {

    let draw = true;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === '')
        {
            draw = false;
        }
    }

    return draw;

}

function gameOver(playerMark, finalWin) {

    colorCells(finalWin);
    console.log(playerMark + ' Wins!');
    console.log('Winning Combo: ' + finalWin);

}

function colorCells(cellArray) {
   
    for (let j = 0; j < cells.length; j++) {
        if (cellArray.includes(parseInt(cells[j].id))) {
            cells[j].style.backgroundColor = "#ff7474";
            cells[j].style.color = "#ffffff";
        }
    }
}


restartFn();