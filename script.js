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

    //checking if we have a winner
    winnerCheck()
    // toggles the turn
    turn = turn === 'x' ? 'o' : 'x'
}

function reset(){
    cellList.forEach((cell)=>{
        cell.className = 'cell'
    })
}

function winnerCheck(){
    let grid = []
    cellList.forEach((cell)=>{
        let mark
        if(cell.classList.contains('x')){
            mark = 'x'
        }else if(cell.classList.contains('o')){
            mark = 'o'
        }else{
            mark = null
        }
        grid.push(mark)
    })
    
    //winner logic
    //vertical cells check
    if(are3EqualAndNotNull(grid[0],grid[3],grid[6])){
        console.log(`The ${grid[0]} is the WINNER!`)
    }
    if(are3EqualAndNotNull(grid[1],grid[4],grid[7])){
        console.log(`The ${grid[1]} is the WINNER!`)
    }
    if(are3EqualAndNotNull(grid[2],grid[5],grid[8])){
        console.log(`The ${grid[2]} is the WINNER!`)
    }

    //horizontal cells check
    if(are3EqualAndNotNull(grid[0],grid[1],grid[2])){
        console.log(`The ${grid[0]} is the WINNER!`)
    }
    if(are3EqualAndNotNull(grid[3],grid[4],grid[5])){
        console.log(`The ${grid[3]} is the WINNER!`)
    }
    if(are3EqualAndNotNull(grid[6],grid[7],grid[8])){
        console.log(`The ${grid[6]} is the WINNER!`)
    }

    //diagonal cells checks
    if(are3EqualAndNotNull(grid[0],grid[4],grid[8])){
        console.log(`The ${grid[0]} is the WINNER!`)
    }
    if(are3EqualAndNotNull(grid[2],grid[4],grid[6])){
        console.log(`The ${grid[2]} is the WINNER!`)
    }
    // TODO: should be stopping the game here 
}

function are3EqualAndNotNull(a,b,c){
    return (a===b && b===c && a!==null)
}