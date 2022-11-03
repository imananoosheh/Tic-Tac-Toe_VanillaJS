"use strict";
//TODO: refactor x and o to 1 and 0
let turn = Math.random() > 0.5 ? "x" : "o";
const cellList = document.querySelectorAll(".cell");

cellList.forEach((cell) => {
    cell.addEventListener("click", () => {
        play(cell)
    });
});

function play(cell) {
    const hasX = cell.classList.contains('x')
    const hasO = cell.classList.contains('o')
    if (hasX || hasO) return
    if (turn === "x") {
        cell.classList.toggle("x");
    }else{
        cell.classList.toggle('o')
    }
    // toggles the turn
    turn = turn === 'x' ? 'o' : 'x'
}

function reset(){
    cellList.forEach((cell)=>{
        cell.className = 'cell'
    })
}
