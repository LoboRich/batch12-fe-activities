// select all data-cell
var dataCell = document.querySelectorAll('[data-cell]');
// add click listeners to each cells
dataCell.forEach(cell => {
    cell.addEventListener('click', handleClick(), {once: true});
})

function handleClick(){
}

function placeMark(){

}