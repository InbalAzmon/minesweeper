'use strict'
console.log('welcome to the first project of Inbal Azmon :)');
const MINE = '💥';
const FLAG = '⛳';
const EMPTY = ' ';
const SMILY = '😊';
const WIN = '😁';
const LOSE = '😭';

var gLevels = [];
var gBoard = [];
var gSelectedLevel;
var gCounter = 0;
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    stGame();
    createLevelList();
    renderLevel();
    gBoard = buildBoard();
    renderBoard();
}
function stGame(){
    gGame.isOn = true;
    gSelectedLevel = { size: 4, mines: 2};
    document.querySelector(".smile").innerText = SMILY;
}
function buildBoard() {
    var boardSize = gSelectedLevel.size;
    var board = [];
    for (var i = 0; i < gSelectedLevel.size; i++) {
        board[i] = [];
        for (var j = 0; j < gSelectedLevel.size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: true,
                isMine: false,
                isMarked: false
            }
        }
    }
    for (var u = 0; u < gSelectedLevel.mines; u++) {
        i = getRandomInteger(0, boardSize - 1);
        j = getRandomInteger(0, boardSize - 1);
        while (board[i][j].isMine === true) {
            i = getRandomInteger(1, boardSize - 1);
            j = getRandomInteger(1, boardSize - 1);
        }
        board[i][j].isMine = true;
    }

    for (var i = 0; i < gSelectedLevel.size; i++) {
        for (var j = 0; j < gSelectedLevel.size; j++) {
            board[i][j].minesAroundCount = countNeighbors(i, j, board);
        }
    return board;
}
}

function renderBoard() {
    var strHtml = `<table><tbody>`;
    for (var i = 0; i < gSelectedLevel.size; i++) {
        strHtml += ' <tr>';
        for (var j = 0; j < gSelectedLevel.size; j++) {
            if (gBoard[i][j].isShown)
                strHtml += ` <td class="cell cell-${i}-${j}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="setFlag(event,${i, j})">${gBoard[i][j].isMine === true ? MINE : gBoard[i][j].minesArountCount ? gBoard[i][j].minesArountCount : ''}</td>`;
        }
        strHtml += ' </tr>';
    }
    strHtml += '</tbody></table>';
    document.querySelector(".board").innerHTML = strHtml;
}

function setRandomMines() {
    var boardSize = gSelectedLevel.size;
    for (var i = 0; i < gSelectedLevel.mines; i++) {
        var i = getRandomInteger(0, boardSize - 1);
        var j = getRandomInteger(0, boardSize - 1);
        while (gBoard[i][j].isMine === true) {
            i = getRandomInteger(1, boardSize - 1);
            j = getRandomInteger(1, boardSize - 1);
        }
        gBoard[i][j].isMine = true;
    }
}

function setMinesNegs() {
    for (var i = 0; i < gSelectedLevel.size; i++) {
        for (var j = 0; j < gSelectedLevel.size; j++) {
            gBoard[i][j].minesAroundCount = countNeighbors(i, j, gBoard);
        }
    }
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function cellClicked(board, i, j) {
    gCounter++;
    if (gCounter === 2) {
        setRandomMines();
        setMinesNegs();
    }
    if (gGame.isOn) {
        if (gBoard[i][j].isMarked) return;
        if (gBoard[i][j].isMine) {
            renderCell({ i, j }, MINE);
            gGame.isOn = false;
            checkGameOver();
        } else {
            expandShown(board, i, j)
        }
    } else return;
}

function renderLevel() {
    var elLevelTable = document.querySelector(".level");
    var strHtml = ``;
    for (var i = 0; i < 3; i++) {
        strHtml += `<input name="difficulty" type="radio" data-index="${i}" onclick="setDifficulty(${i})" ${i === 0 ? "checked" : ""} ">${gLevels[i].name}`
    }
    elLevelTable.innerHTML = strHtml;
}

function checkGameOver() {
    if (gGame.shownCount + gGame.markedCount === gSelectedLevel.size ** 2) {
        console.log('YOU WON!');
        document.querySelector(".smile").innerText = WIN;
    } else console.log('YOU LOSE...');
    document.querySelector(".smile").innerText = LOSE;
}

function createLevelList() {
    gLevels.push(createLevel(0, 'Beginner', 4, 2, true));
    gLevels.push(createLevel(1, 'Medium', 8, 12, false));
    gLevels.push(createLevel(2, 'Expert', 12, 30, false));

}

function setFlag(event, i, j) {
    if (gGame.isOn) {
        if (gBoard[i][j].isShown === true) {
            alert('Cannot flag shown cell');
        } else if (gBoard[i][j].isMarked) {
            gBoard[i][j].isMarked = false;
            renderCell({ i, j }, '');
        } else {
            gBoard[i][j].isMarked = true;
            renderCell({ i, j }, FLAG);
        }
    }
    event.preventDefault();
    return false;

}


function createLevel(id, name, size, mines, isSelected) {
    return {
        id,
        name,
        size,
        mines,
        isSelected,
    }
}

function expandShown(board, i, j) {
    var cellI = i;
    var cellJ = j;
    if (gBoard[i][j].minesAroundCount === 0) {
        console.log('hi');
        for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i >= gSelectedLevel.size) continue;
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j >= gSelectedLevel.size) continue;
                gBoard[i][j].isShown = true;
            }
        }
        renderBoard();
    } else {
        console.log('hi2');
        gBoard[i][j].isShown = true;
        renderCell({ i, j }, gBoard[i][j].minesAroundCount);
    }
}

function countNeighbors(cellI, cellJ, mat) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine === true) neighborsSum++;
        }
    }
    return neighborsSum;
}

function setDifficulty(levelCell) {
    for (var i = 0; i < gLevels.length; i++) {
        if (i === levelCell) {
            gSelectedLevel.size = gLevels[i].size;
            gSelectedLevel.mines = gLevels[i].mines;
            gLevels[levelCell].isSelected = true;
        }
    }
    gBoard = buildBoard();
    renderBoard();
}

function getRandomInteger(min, max) {
    var num = Math.floor(Math.random() * Math.floor(max + 1));
    while (num < min) {
        num = Math.floor(Math.random() * Math.floor(max + 1));
    }
    return num;
}
// function startTimer(selector) {
//     var startTime = Date.now();
//     gGameInterval = setInterval(function renderTime() {
//         var currTime = Date.now();
//         var timePassed = currTime - startTime;
//         var seconds = ((timePassed % 60000) / 1000).toFixed(3);
//         document.querySelector(`${selector}`).innerText = seconds;
//     }, 1);
// }
// function setMinesNegsCount(board)

// function cellMarked(elCell) 
// function checkGameOver() 
