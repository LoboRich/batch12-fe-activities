const xClass = 'x';
const circleClass = 'circle';
var board = document.getElementById('board');
// select all data-cell
var dataCell = document.querySelectorAll('[data-cell]');
// add click listeners to each cells
let xTurn;

start();

function start(){
    xTurn = true;
    dataCell.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true});
    })
    setBoardHoverCurrentTurn();
}

function handleClick(e){
    const cell = e.target;
    const currentTurn  = xTurn ? xClass : circleClass;
    placeMark(cell, currentTurn);
    switchTurn();
    setBoardHoverCurrentTurn();
}

function placeMark(cell, currentTurn){
    cell.classList.add(currentTurn);
}

function switchTurn(){
    xTurn = !xTurn
}

function setBoardHoverCurrentTurn(){
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if(xTurn){
        board.classList.add(xClass);
    }else{
        board.classList.add(circleClass);
    }
}