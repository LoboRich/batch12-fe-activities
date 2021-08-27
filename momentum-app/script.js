let greet = document.getElementById('greet');
let input = document.getElementById('input-name');
let nav = document.getElementById('nav');
let todoList = document.getElementById('todoList');
var todoTable = document.getElementById('listTable');

myStorage = window.localStorage;

// add name to local storage
const nameForm = document.getElementById( "myForm" );
const nameField = document.getElementById('name');

nameForm.addEventListener( "submit", function ( ) {
  myStorage.setItem("name", nameField.value);
} );

// load stored name

if (localStorage.getItem("name")) {
	greet.textContent = "Hi "+localStorage.getItem("name")+". Have a nice day!";
	greet.style.display = 'flex';
	nav.style.display = 'flex';
	input.style.display = 'none';
} else {
	greet.style.display = 'none';
	nav.style.display = 'none';
	input.style.display = 'flex';
	todoList.style.display = 'none';
}

// clear storage
function clearSession(){
  myStorage.clear();
  location.reload();
}

// load time

function showTime(){ 
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " ";
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();

// draggable todo list div

dragElement(document.getElementById("todoList"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// todo close and open todo list

function closeTodoList() {
	todoList.style.display = 'none';
}

function openTodoList() {
	todoList.style.display = 'block';
}

// add todo

const todoForm = document.getElementById( "addTodo" );
let todoInput = document.getElementById('todo');

todoForm.addEventListener( "submit", function ( event ) {
  event.preventDefault();
  
  if (myStorage.getItem("todo") === null) {
    myStorage.setItem("todo", JSON.stringify([]));
  }

  var todoLocal = JSON.parse(myStorage.getItem("todo"));
  todoLocal.push(todoInput.value);
  myStorage.setItem("todo", null);
  myStorage.setItem("todo", JSON.stringify(todoLocal));
  appendTodo(todoInput.value);
  
  todoForm.reset();
  
} );

function appendTodo(todo){
  todoTable.innerHTML += ('<tr><td>'+todo+'</td><td><i class="fa fa-check"></td><td><i class="fa fa-times"></td></tr>');
}

// populate todo list on load

function loadTodoTable(){
  if (myStorage.getItem("todo") === null) {
    myStorage.setItem("todo", JSON.stringify([]));
  }
  var todoLocal = JSON.parse(myStorage.getItem("todo"));
  for (var i = 0; i < todoLocal.length; i++) {
    todoTable.innerHTML += ('<tr><td>'+todoLocal[i]+'</td><td><i class="fa fa-check"></td><td><i class="fa fa-times"></td></tr>');
  }
}

loadTodoTable();

// updated & load quote

var quote = document.getElementById('quote');
quote.addEventListener('input', function() {
    // alert('Hey, somebody changed something in my text!');
    if (myStorage.getItem("quote") === null) {
      myStorage.setItem("quote", "");
    }
    var quoteLocal = myStorage.getItem("quote");
    myStorage.setItem("quote", null);
    myStorage.setItem("quote", quote.innerText);
});

function loadQuote(){
  if (myStorage.getItem("quote") === null) {
    myStorage.setItem("quote", "Faith moves mountains.");
  }else{
    var quoteLocal = myStorage.getItem("quote");
    quote.innerText = quoteLocal;
  }

}
loadQuote();