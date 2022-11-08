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
        if (result === "x" || result === "o") break;
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
    if (result === "x" || result === "o") {
        console.log(`result is: ${result}`);
    } //TODO: the end needs to be defined and stop from clicking the cells

    if (result === "tie") {
        console.log(`result is: ${result}`);
    }
    // toggles the turn
    turn = turn === "x" ? "o" : "x";
}

function reset() {
    cellList.forEach((cell) => {
        cell.className = "cell";
    });
}

function winnerCheck() {
    let grid = [];
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

    //winner logic
    switch (true) {
        //vertical cells check
        case are3EqualAndNotNull(grid[0], grid[3], grid[6]):
            return grid[0];
        case are3EqualAndNotNull(grid[1], grid[4], grid[7]):
            return grid[1];
        case are3EqualAndNotNull(grid[2], grid[5], grid[8]):
            return grid[2];

        //horizontal cells check
        case are3EqualAndNotNull(grid[0], grid[1], grid[2]):
            return grid[0];
        case are3EqualAndNotNull(grid[3], grid[4], grid[5]):
            return grid[3];
        case are3EqualAndNotNull(grid[6], grid[7], grid[8]):
            return grid[6];

        //diagonal cells checks
        case are3EqualAndNotNull(grid[0], grid[4], grid[8]):
            return grid[0];
        case are3EqualAndNotNull(grid[2], grid[4], grid[6]):
            return grid[2];
        
        //when is tie
        case !grid.includes(null):
            return 'tie'
            
        default:
            break;
    }
    // //TODO: change to switch statements
    // if (are3EqualAndNotNull(grid[0], grid[3], grid[6])) {
    //     console.log(`The ${grid[0]} is the WINNER!`);
    //     return grid[0];
    // }
    // if (are3EqualAndNotNull(grid[1], grid[4], grid[7])) {
    //     console.log(`The ${grid[1]} is the WINNER!`);
    //     return grid[1];
    // }
    // if (are3EqualAndNotNull(grid[2], grid[5], grid[8])) {
    //     console.log(`The ${grid[2]} is the WINNER!`);
    //     return grid[2];
    // }

    // //horizontal cells check
    // if (are3EqualAndNotNull(grid[0], grid[1], grid[2])) {
    //     console.log(`The ${grid[0]} is the WINNER!`);
    //     return grid[0];
    // }
    // if (are3EqualAndNotNull(grid[3], grid[4], grid[5])) {
    //     console.log(`The ${grid[3]} is the WINNER!`);
    //     return grid[3];
    // }
    // if (are3EqualAndNotNull(grid[6], grid[7], grid[8])) {
    //     console.log(`The ${grid[6]} is the WINNER!`);
    //     return grid[6];
    // }

    // //diagonal cells checks
    // if (are3EqualAndNotNull(grid[0], grid[4], grid[8])) {
    //     console.log(`The ${grid[0]} is the WINNER!`);
    //     return grid[0];
    // }
    // if (are3EqualAndNotNull(grid[2], grid[4], grid[6])) {
    //     console.log(`The ${grid[2]} is the WINNER!`);
    //     return grid[2];
    // }

    //tie
    // if(!grid.includes(null)){
    //     console.log(`It's a Tie`);
    //     return "tie";
    // }

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

function endGame(){
    //print resault

    //disable intractions
}