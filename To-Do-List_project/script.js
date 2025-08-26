const inputbox = document.getElementById('inputbox');
const addBtn = document.getElementById('addBtn');
const todolist = document.getElementById('todolist');

let edittodo = null;

//func to add todo
const addTodo=()=>{
    const inputtext = inputbox.value.trim();
    if(inputtext.length <=0){
        alert("You must write something in your to do");
        return false;
    }
    if(addBtn.value === "Edit"){
        editlocaltodos(edittodo.target.previousElementSibling.innerHTML);
        edittodo.target.previousElementSibling.innerHTML = inputtext;
        addBtn.value ="ADD";
        inputbox.value = "";
    }
    else{
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputtext;
        li.appendChild(p);
        //edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn","editBtn");
        li.appendChild(editBtn);
        //delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn","deleteBtn");
        li.appendChild(deleteBtn);
        todolist.appendChild(li); 
        inputbox.value ="";
        saveLocalTodos(inputtext);
    }
} 

//func to edit and delete todo
const updatetodo =(e)=>{
    if(e.target.innerHTML === "Remove"){
        todolist.removeChild(e.target.parentElement);
        deletelocaltodo(e.target.parentElement);
    }

    if(e.target.innerHTML === "Edit"){
        // console.log(e.target.previousElementSibling);
        inputbox.value = e.target.previousElementSibling.innerHTML;
        inputbox.focus();
        addBtn.value = "Edit";
        edittodo =e;
    }
}
 
const saveLocalTodos = (todo)=>{
    let todos =[];
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    // console.log(todos);
}

const getlocaltodos = ()=>{
    let todos =[];
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);
            //edit button
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn","editBtn");
            li.appendChild(editBtn);
            //delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn","deleteBtn");
            li.appendChild(deleteBtn);
            todolist.appendChild(li); 
        });
    }
}

const deletelocaltodo =(todo)=>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todotext = todo.children[0].innerHTML;
    // console.log(todotext);
    let todoIndex = todos.indexOf(todotext);
    // console.log(todoIndex);
    //array func : slice/splice
    todos.splice(todoIndex,1)
    localStorage.setItem("todos",JSON.stringify(todos));
}

const editlocaltodos = (todo) =>{
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputbox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getlocaltodos);
addBtn.addEventListener('click', addTodo);
todolist.addEventListener('click', updatetodo);

