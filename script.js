"use strict";
//TODO: refactor x and o to 1 and 0
let turn = Math.random() > 0.5 ? "x" : "o";
const cellList = document.querySelectorAll(".cell");
const resetButton = document.querySelector("[data-reset-button]");
resetButton.addEventListener("click", () => {
    reset();
});

const randomPlayButton = document.querySelector("[data-random-play-button]");
randomPlayButton.addEventListener("click", () => {
    reset();
    let cellArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    while (cellArray.length > 0) {
        let randomIndex =
            cellArray[Math.floor(Math.random() * cellArray.length)];
        cellList[randomIndex].classList.add(turn);
        cellArray.splice(cellArray.indexOf(randomIndex), 1);
        turn = turn === "x" ? "o" : "x";
        let result = winnerCheck();
        if (result) {
            endGame(result)
            break
        };
    }
});

cellList.forEach((cell) => {
    cell.addEventListener("click", () => {
        play(cell);
    });
});

function play(cell) {
    const hasX = cell.classList.contains("x");
    const hasO = cell.classList.contains("o");
    if (hasX || hasO) return;
    if (turn === "x") {
        cell.classList.toggle("x");
    } else {
        cell.classList.toggle("o");
    }

    //checking if we have a winner
    let result = winnerCheck();
    if(result != undefined){
        endGame(result)
    }
    turn = turn === "x" ? "o" : "x";
}

function reset() {
    cellList.forEach((cell) => {
        cell.className = "cell";
    });
    const overlay = document.querySelector('[data-overlay]')
    if(overlay){
        overlay.remove();
    }
    const gameWinnerContainer = document.querySelector('[data-winner-container]')
    gameWinnerContainer.innerHTML = ''
}

function winnerCheck() {
    //winner logic
    /* possible wins are derived from mapping below:
    0   1   2
    3   4   5
    6   7   8
    */
    const possibleWins = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]]
    let grid = [];
    //mapping user inputs to the grid
    cellList.forEach((cell) => {
        let mark;
        if (cell.classList.contains("x")) {
            mark = "x";
        } else if (cell.classList.contains("o")) {
            mark = "o";
        } else {
            mark = null;
        }
        grid.push(mark);
    });

    for(let winCase of possibleWins){
        if(are3EqualAndNotNull(grid[winCase[0]],grid[winCase[1]],grid[winCase[2]])){
            return grid[winCase[0]]
        }
    }
    if(!grid.includes(null)){
        return 'tie'
    }

    // TODO: should be stopping the game here
}

function are3EqualAndNotNull(a, b, c) {
    return a === b && b === c && a !== null;
}

function drawALine() {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    canvas.style = "position: absolute;";
    const gridContainer = document.querySelector("[data-grid-container]");
    gridContainer.appendChild(canvas);
    const canvasContext = canvas.getContext("2d");
    drawLine(canvasContext, 50, 50, 350, 350, "#324");
    canvasContext.createLinearGradient()
}

function drawLine(canvasContext, fromX, fromY, toX, toY, strokeColor = "#FFF") {
    canvasContext.beginPath();
    canvasContext.moveTo(fromX, fromY);
    canvasContext.lineTo(toX, toY);
    canvasContext.strokeStyle = strokeColor;
    canvasContext.stroke();
    canvasContext.createLinear
}

function endGame(winner){
    //print resault
    const gameWinnerContainer = document.querySelector('[data-winner-container]')
    const winnerStatement = document.createElement('h2')
    winnerStatement.textContent = winner==='tie' ? `The game was a tie` : `${winner.toLocaleUpperCase()} is the WINNER!!!`
    gameWinnerContainer.appendChild(winnerStatement)
    
    //disable intractions
    const overlay = document.createElement('div')
    overlay.setAttribute('data-overlay','')
    overlay.style = 'background:#fff;opacity:.3;width:100%;height:100%;position:absolute';
    const gridContainer = document.querySelector("[data-grid-container]");
    gridContainer.appendChild(overlay)
}