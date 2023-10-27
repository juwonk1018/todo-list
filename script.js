const createButton = document.getElementById("create-btn");
const todoList = document.getElementById("todoList");

let todos = [];

createButton.addEventListener('click', createNewTodo);


function createNewTodo() {

    const item = {
        id : new Date().getTime(),
        text : '',
        complete : false
    }

    todos.unshift(item);

    const {itemElement, inputElement} = createTodoItem(item);

    todoList.append(itemElement);

    inputElement.removeAttribute("disabled");
    inputElement.focus();    

    saveToLocalStorage();
}


function createTodoItem(item){

    const itemElement = document.createElement("div");
    itemElement.classList.add("todoItem");

    const checkBoxElement = document.createElement("input");
    checkBoxElement.type = "checkbox";
    checkBoxElement.checked = item.complete;

    if(item.complete){
        itemElement.classList.add("complete");
    }
    
    checkBoxElement.addEventListener('change', () => {
        item.complete = checkBoxElement.checked;

        if(item.complete){
            itemElement.classList.add("complete");
        }
        else{
            itemElement.classList.remove("complete");
        }

        saveToLocalStorage();
    });

    if(item.complete){
        itemElement.classList.add("complete");
    }

    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = item.text;
    inputElement.setAttribute("disabled", "");


    inputElement.addEventListener('input', () => {
        item.text = inputElement.value;
        saveToLocalStorage();
    });

    inputElement.addEventListener('blur', () => {
        inputElement.setAttribute("disabled", "");
        saveToLocalStorage();
    });


    const actionsElement = document.createElement("div");
    actionsElement.classList.add("actions");

    const editBtnElement = document.createElement("button");
    editBtnElement.classList.add("material-icons");
    editBtnElement.innerText = "edit";

    editBtnElement.addEventListener('click', () => {
        inputElement.removeAttribute("disabled");
        inputElement.focus();
    });

    const removeBtnElement = document.createElement("button");
    removeBtnElement.classList.add("material-icons", "remove-btn");
    removeBtnElement.innerText = "remove_circle";

    removeBtnElement.addEventListener('click', () => {
        todos = todos.filter(t => t.id != item.id);
        itemElement.remove();
        saveToLocalStorage();
    });
    
    actionsElement.append(editBtnElement);
    actionsElement.append(removeBtnElement);

    itemElement.append(checkBoxElement);
    itemElement.append(inputElement);
    itemElement.append(actionsElement);
    
    saveToLocalStorage();
    
    return { itemElement, inputElement, editBtnElement, removeBtnElement }
}

function saveToLocalStorage(){
    const data = JSON.stringify(todos);
    window.localStorage.setItem("my_todos", data);
}

function loadFromLocalStorage(){

    const data = localStorage.getItem("my_todos");

    if(data){
        todos = JSON.parse(data);
    }
}

function displayTodos(){
    loadFromLocalStorage();

    for (let i=0;i<todos.length;i++){
        const item = todos[i];
        console.log(item);

        
        const { itemElement } = createTodoItem(item);

        console.log(itemElement);
        todoList.append(itemElement);
    }
}


displayTodos();
