const xClass = 'x';
const circleClass = 'circle';
var board = document.getElementById('board');
let dataCell = document.querySelectorAll('[data-cell]');
let xTurn;
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
start();

// starts the game
function start(){
    xTurn = true;
    // add click listeners to each cells
    dataCell.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true});
    })
    setBoardHoverCurrentTurn();
}
// handling cell click
function handleClick(e){
    const cell = e.target;
    const currentTurn  = xTurn ? xClass : circleClass;
    placeMark(cell, currentTurn);
    checkWin(currentTurn);
    switchTurn();
    setBoardHoverCurrentTurn();
}
// placing mark to cell
function placeMark(cell, currentTurn){
    cell.classList.add(currentTurn);
}
// switching turns
function switchTurn(){
    xTurn = !xTurn
}
// set board hover to identify current turn
function setBoardHoverCurrentTurn(){
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if(xTurn){
        board.classList.add(xClass);
    }else{
        board.classList.add(circleClass);
    }
}

// checkWinningCombinations
function checkWin(currentTurn){
    // get all indexes where current turn was placed.
    // check in winning combination array if there were matching combinations
    datacellArray = Array.from(dataCell);
    
}


