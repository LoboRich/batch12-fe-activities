myStorage = window.sessionStorage;
		
		let greet = document.getElementById('greet');
		let input = document.getElementById('input-name');
		let nav = document.getElementById('nav');

		// Access the form element...
		const form = document.getElementById( "myForm" );

		function sendData() {
			const XHR = new XMLHttpRequest();

			// Bind the FormData object and the form element
			const FD = new FormData( form );

			// console.log(FD.get('name'));
			sessionStorage.setItem('name', FD.get('name'));
			location.reload();
		}

		// ...and take over its submit event.
		form.addEventListener( "submit", function ( event ) {
			event.preventDefault();
			sendData();
		} );

		if (sessionStorage.getItem('name')) {
			greet.textContent = "Hi "+sessionStorage.getItem('name')+". Have a nice day!";
			greet.style.display = 'flex';
			nav.style.display = 'flex';
			input.style.display = 'none';
		} else {
			greet.style.display = 'none';
			nav.style.display = 'none';
			input.style.display = 'flex';
		}

		// clear all sessions
		function clearSession(){
			sessionStorage.clear();
		}

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

		//Make the DIV element draggagle:
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