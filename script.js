let submitBtn = document.querySelector(".submit-task");
submitBtn.addEventListener("click", () => {
  let singleTaskText = document.getElementById("task-store");
  let titleText = document.querySelector("h2");

  if (!singleTaskText.value) {
    titleText.innerText = "Enter something before submit";
  } else {
    titleText.innerText = "Create your task";
    let singleTodo = document.createElement("div");
    singleTodo.classList.add("single-todo-container");
    singleTodo.innerHTML = `
    <input type="text" 
    value="${singleTaskText.value}"
    class="task-input"
    readonly >
    <button class="edit-single-todo">Edit</button>
    <button class="delete-single-todo">Delete</button>
  `;

    let todoListContainer = document.querySelector(".todo-list-container");
    todoListContainer.appendChild(singleTodo);

    let inputField = singleTodo.querySelector(".task-input");
    let editBtn = singleTodo.querySelector(".edit-single-todo");
    let deleteBtn = singleTodo.querySelector(".delete-single-todo");

    editBtn.addEventListener("click", () => {
      if (editBtn.innerText == "Edit") {
        inputField.removeAttribute("readonly");
        inputField.style.color = "grey";
        editBtn.innerText = "Save";
      } else if (editBtn.innerText == "Save") {
        inputField.setAttribute("readonly", "readonly");
        inputField.style.color = "black";
        editBtn.innerText = "Edit";
      }
    });
    deleteBtn.addEventListener("click", () => {
      todoListContainer.removeChild(singleTodo);
      savetodo();
    });
    singleTaskText.value="";
    savetodo();

  }
});
// setInterval( savetodo,2000);

function savetodo() {
  let inputFields = document.querySelectorAll(".task-input");
  let dataArr = [];
  for (let i = 0; i < inputFields.length; i++) {
    dataArr.push(inputFields[i].value);
  }
  console.log(dataArr);
  let todoListString = JSON.stringify(dataArr);
  localStorage.setItem("todoListText", todoListString);
}

window.addEventListener("load", () => {
  let todoListStringLC = localStorage.getItem("todoListText");
  if (todoListStringLC) {
    console.log(todoListStringLC);
    let dataArrLC = JSON.parse(todoListStringLC);
    for (let i = 0; i < dataArrLC.length; i++) {
      let singleTodo = document.createElement("div");
      singleTodo.classList.add("single-todo-container");
      singleTodo.innerHTML = `
        <input type="text" 
        value="${dataArrLC[i]}"
        class="task-input"
        readonly >
        <button class="edit-single-todo">Edit</button>
        <button class="delete-single-todo">Delete</button>
        `;
      let todoListContainer = document.querySelector(".todo-list-container");
      todoListContainer.appendChild(singleTodo);
      let inputField = singleTodo.querySelector(".task-input");
      let editBtn = singleTodo.querySelector(".edit-single-todo");
      let deleteBtn = singleTodo.querySelector(".delete-single-todo");

      editBtn.addEventListener("click", () => {
        if (editBtn.innerText == "Edit") {
          inputField.removeAttribute("readonly");
          inputField.style.color = "grey";
          editBtn.innerText = "Save";
        } else if (editBtn.innerText == "Save") {
          inputField.setAttribute("readonly", "readonly");
          inputField.style.color = "black";
          editBtn.innerText = "Edit";
        }
      });
      deleteBtn.addEventListener("click", () => {
        todoListContainer.removeChild(singleTodo);
        savetodo();
      });
    }
  }
});
