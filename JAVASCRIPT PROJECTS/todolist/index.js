const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));

if (list) {
    list.forEach((task) => {
      todoList(task);
    });
}


formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    todoList();
});

function todoList(task){
    let newTask = inputEl.value;
    if(task){
        newTask=task.name;
    }
    const liEl = document.createElement("li");
    if(task && task.checked){
        liEl.classList.add("checked");
    }    
    liEl.innerText = newTask;
    ulEl.appendChild(liEl);
    inputEl.value = "";
    const checkbtnEl = document.createElement("div");
    checkbtnEl.innerHTML = `<i class="fas fa-check-square"></i
    >`;
    liEl.appendChild(checkbtnEl);
    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = `
    <i class="fas fa-trash"></i>
    `;
    liEl.appendChild(trashBtnEl);
    checkbtnEl.addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
      });

    trashBtnEl.addEventListener("click",()=>{
        liEl.remove();
        updateLocalStorage();
       });
    updateLocalStorage();
}

function updateLocalStorage(){
    const liEls = document.querySelectorAll("li");
    list = [];
    liEls.forEach((liEl) =>{
        list.push({
            name:liEl.innerText,
            checked:liEl.classList.contains("checked"),

        });
    });
    localStorage.setItem("list",JSON.stringify(list));
}



