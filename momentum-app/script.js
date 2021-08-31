// storage declaration
myStorage = window.localStorage;

let greet = document.getElementById('greet');
let input = document.getElementById('input-name');
let nav = document.getElementById('nav');
let todoList = document.getElementById('todoList');
var todoTable = document.getElementById('listTable');
var focus = document.getElementById('focus');
var focusLocal = myStorage.getItem("focus");
var focusValue = document.getElementById('focus-value');
var greetings = document.getElementById('greetings');

// Quotes elements declatration
var quoteForm = document.getElementById('quote-form');
var quote = document.getElementById('quote');
var quoteField = document.getElementById('quote-field');
var quoteLocal = myStorage.getItem("quote");

// add name to local storage
const nameForm = document.getElementById( "myForm" );
const nameField = document.getElementById('name');

nameForm.addEventListener( "submit", function ( ) {
  myStorage.setItem("name", nameField.value);
} );

var i = 0;
var txt = "Hi "+localStorage.getItem("name")+". Have a nice day!";
var speed = 60;

function typeWriter() {
  
  if (i < txt.length) {
    document.getElementById("greet").textContent += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

// load stored name
if (localStorage.getItem("name")) {

	greet.style.display = 'flex';
	nav.style.display = 'flex';
	input.style.display = 'none';
  focus.style.display = 'flex';

  typeWriter()
} else {
	greet.style.display = 'none';
	nav.style.display = 'none';
	input.style.display = 'flex';
	todoList.style.display = 'none';
  focus.style.display = 'none';
  greetings.style.width = '50%';
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

  let newTodo = {
    id: nextTodoId(),
    todo: todoInput.value,
    status: 0
  }
  todoLocal.push(newTodo);
  myStorage.setItem("todo", null);
  myStorage.setItem("todo", JSON.stringify(todoLocal));
  appendTodo(todoInput.value, nextTodoId());
  
  todoForm.reset();
  
} );

function appendTodo(todo, id){
  todoTable.innerHTML += ('<tr id="'+id+'"><td>'+todo+'</td><td><i class="fa fa-check" onclick="completeTodo(this)"></td><td><i class="fa fa-times" onclick="removeTodo(this)"></td></tr>');
}

// populate todo list on load

function loadTodoTable(){
  if (myStorage.getItem("todo") === null) {
    myStorage.setItem("todo", JSON.stringify([]));
  }
  var todoLocal = JSON.parse(myStorage.getItem("todo"));
  for (var i = 0; i < todoLocal.length; i++) {

    if (todoLocal[i].status === 1) {
      todoTable.innerHTML += ('<tr id="'+todoLocal[i].id+'"><td class='+green-bg+'>'+todoLocal[i].todo+'</td><td><i class="fa fa-check" onclick="completeTodo(this)"></td><td><i class="fa fa-times"  onclick="removeTodo(this)"></td></tr>');
    }else {
      todoTable.innerHTML += ('<tr id="'+todoLocal[i].id+'"><td>'+todoLocal[i].todo+'</td><td><i class="fa fa-check" onclick="completeTodo(this)"></td><td><i class="fa fa-times"  onclick="removeTodo(this)"></td></tr>');
    }
    
  }
}

loadTodoTable();

// updated & load quote

quoteForm.addEventListener( "submit", function (  ) {
  fetchObjectInLocalStorage('quote');

  myStorage.setItem("quote", "");
  myStorage.setItem("quote", quoteField.value);
  quote.innerText = '"'+quoteLocal+'"';
  alert("Your favorite quote was successfully updated.");

  window.location.href = window.location.pathname + "#close";
} );


function loadQuote(){
  if (myStorage.getItem("quote") === null) {
    myStorage.setItem("quote", "Faith moves mountains.");
  }else{
    quote.textContent = '"'+quoteLocal+'"';
  }

}
loadQuote();

// updated & load focus

var focusForm = document.getElementById('focus-form');
var focusField = document.getElementById('focus-field');
focusForm.addEventListener( "submit", function (  ) {
  fetchObjectInLocalStorage('focus');

  myStorage.setItem("focus", "");
  myStorage.setItem("focus", focusField.value);
  focusValue.innerText = focusLocal;
  alert("Your focus for today was successfully updated.");

  window.location.href = window.location.pathname + "#close";
} );


function loadFocus(){
  if (myStorage.getItem("focus") === null) {
    myStorage.setItem("focus", "Add your today's focus.");
  }else{
    focusValue.textContent = focusLocal;
  }

}
loadFocus();

function showQuoteAction(){
  document.getElementById('quote-action').style.display = 'flex'
}
function hideQuoteAction(){
  document.getElementById('quote-action').style.display = 'none'
}

function fetchObjectInLocalStorage(obj){
  var objLocal = myStorage.getItem(obj);
  if (objLocal === null) {
    myStorage.setItem(obj, null);
  }
  return objLocal;
}


function removeTodo(todo){
  var listId = todo.parentElement.parentElement;
  var todoLocal = JSON.parse(myStorage.getItem("todo"));
  var id = listId.id;
  listId.remove();
}
 

function completeTodo(todo) {
  var listId = todo.parentElement.parentElement;
  listId.classList.add("green-bg");
  var id = listId.id;

  var tr = document.getElementById(listId.id);
  tr.removeChild(tr.childNodes[1]); 
  tr.children[0].setAttribute("colspan", "2");
}

function nextTodoId(){
  var todo = JSON.parse(myStorage.getItem("todo"));

  var nextId = 1;
  for (var i = 0; i < todo.length; i++) {
    if (todo[i].id > nextId) {
      nextId = todo[i].id;
    }else{
      nextId += todo[i].id;
    }
  }

  return nextId;
}
