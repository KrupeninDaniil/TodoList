let massivToDo = [];
let ul = document.querySelector("ul.todos");
	ul.addEventListener("click", onClickToDo);
let input = document.querySelector("input[type='text']");
let todoBody = document.getElementById("todo");
let clearButton = document.querySelector("button.clear");
let showTipsButton = document.querySelector("button.showTips");
let closeTipsButton = document.querySelector("button.closeTips");
let overlay = document.querySelector("#overlay");
let saveButton = document.querySelector("button.save");

showTipsButton.addEventListener("click", () => {
    overlay.style.display = "block";
    }); 
closeTipsButton.addEventListener("click", () => {
    overlay.style.display = "none";
    });
	
saveButton.addEventListener("click", () => {
	let massave = JSON.stringify(massivToDo);
    localStorage.setItem("todos", massave);
    });

clearButton.addEventListener("click", () => {
	for (let i=0; i<=massivToDo.length; i++) {
		massivToDo.splice(i);
	}
	ul.innerHTML = "";
	localStorage.removeItem('todos');
})

function renderTodo () {
	ul.innerHTML = "";	
	for (let i=0; i<massivToDo.length; i++) { 
		let li = document.createElement("li");
			li.id = massivToDo[i].id;
			li.classList.add(massivToDo[i].status);
		let textSpan = document.createElement("span");
			textSpan.classList.add("todo-text");
			textSpan.id = massivToDo[i].id;
		let textValue = massivToDo[i].value;
			textSpan.append(textValue);
		let deleteBtn = document.createElement("button"); 
			deleteBtn.type = "button";
			deleteBtn.innerText = "Удалить";
			deleteBtn.onclick = deleteli;
			deleteBtn.classList.add("todo-trash");
		function deleteli() {
			let indexli = massivToDo.findIndex((item) => {
				if (item.id === li.id) {
					return true
				}
			})
			massivToDo.splice(indexli, 1);
			li.remove();
			let massave = JSON.stringify(massivToDo);
			localStorage.setItem("todos", massave);
		}
		ul.appendChild(li).append(textSpan, deleteBtn);
		input.value = "";
	}
}

function addData() {
	if (input.value == "") {
		return false;
	} else {
		massivToDo.push({value: input.value, id: String(Date.now()), status: "inwork"});
		renderTodo();
	}
}

function loadTodos() {
        let data = JSON.parse(localStorage.getItem("todos"));
        if (data) {
            massivToDo = data;
			renderTodo();
	}
    }
	
loadTodos();

let addBtn = document.createElement("button");
		addBtn.type = "button";
		addBtn.innerText = "Добавить";
		addBtn.onclick = addData;
		todoBody.append(addBtn);

input.addEventListener('keydown', function (event) {
	if (event.code === 'Enter') {
		addData();
		}
	})

	function onClickToDo(event) {
		let b = massivToDo.findIndex((object) => {
			 if (object.id === event.target.id) {
				return true
			}
		})
		if (event.target.className === 'todo-trash'){
			return false
		} else if (massivToDo[b].status === "inwork") {
			massivToDo[b].status = "checked";
		} else {
			massivToDo[b].status = "inwork";
		}
		renderTodo();
	}

	

	
	
