let todosListContainer = document.getElementById("myTasksListContainer");
let addButton = document.getElementById("addButton");
let saveButton = document.getElementById("saveButton");

function getFromLocalStorage(){
    let stringifiedValue = localStorage.getItem("savedTasks");
    let parsedList = JSON.parse(stringifiedValue);

    if (parsedList === null){
        return [];
    }else{
        return parsedList;
    }
}

let savedTasks = getFromLocalStorage();
let todosCount = 0

saveButton.onclick = function(){
    localStorage.setItem("savedTasks",JSON.stringify(savedTasks))
}

function todoTaskCompleted(labelId,todoId){
    let labelTextContent = document.getElementById(labelId);
    labelTextContent.classList.toggle("task-completed")

    let todoIndex = savedTasks.findIndex(function(eachTodo){
        let todoFucId = "todoId" + eachTodo.uniquId;
        if (todoFucId === todoId){
            return true;
        }else{
            return false;
        }
    })
    let todoObject = savedTasks[todoIndex]
    if (todoObject.isChecked === true){
        todoObject.isChecked = false;
    }else{
        todoObject.isChecked = true;
    }
}

function deleteTodoTask(todoId){
    let todoTaskEl = document.getElementById(todoId);
    todosListContainer.removeChild(todoTaskEl);

    let deleteTodoElement = savedTasks.findIndex((eachTodo) => {
        let checkTodo = "todoId" + eachTodo.uniquId;
        if (todoId === checkTodo) {
            return true;
        }
    });
    savedTasks.splice(deleteTodoElement, 1);


}

function createNewTodoTask(todoList){
    let checkboxId = "checkboxId" + todoList.uniquId;
    let labelId = "labelId" + todoList.uniquId;
    let todoId = "todoId" + todoList.uniquId;

    
    let mytaskContainer = document.createElement("li");
    mytaskContainer.classList.add("d-flex","flex-row","mt-3")
    mytaskContainer.id = todoId;
    todosListContainer.appendChild(mytaskContainer);
    
    let inputCheckboxEl = document.createElement("input");
    inputCheckboxEl.type = "checkbox";
    inputCheckboxEl.id = checkboxId;
    inputCheckboxEl.checked = todoList.isChecked;
    inputCheckboxEl.classList.add("input-checkbox")
    mytaskContainer.appendChild(inputCheckboxEl);
    
    inputCheckboxEl.onclick = function(){
        todoTaskCompleted(labelId,todoId)
    }
    
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex","flex-row","label-container")
    mytaskContainer.appendChild(labelContainer);
    
    let inputLabelEl = document.createElement("label");
    inputLabelEl.setAttribute("for",checkboxId);
    inputLabelEl.id = labelId;
    inputLabelEl.textContent = todoList.text;
    inputLabelEl.classList.add("input-label");

    if (todoList.isChecked === true){
        inputLabelEl.classList.add("task-completed");
    }

    labelContainer.appendChild(inputLabelEl);
    
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid","fa-trash-can","delete-icon");
    labelContainer.appendChild(deleteIcon)

    
    deleteIcon.onclick = function(){
        deleteTodoTask(todoId)
    }
    
}

for (let savedTodo of savedTasks){
    createNewTodoTask(savedTodo);
}

function addNewTodo(){
    let userInputElement = document.getElementById("addTodoInput");
    let userInputValue = userInputElement.value;

    todosCount = todosCount + 1

    let todoList = 
    {
        text: userInputValue,
        uniquId: todosCount,
        isChecked: false
    }
    if (userInputValue === ""){
        alert("Enter Valid Input!")
        return;
    }

    savedTasks.push(todoList)

    createNewTodoTask(todoList);

    userInputElement.value = ""
    
}

addButton.onclick = function(){
    addNewTodo()
}




