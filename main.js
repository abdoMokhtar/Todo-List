// Call Element To Control
const body = document.querySelector("body");
const hello = document.querySelector(".hello");
const inputUser = document.querySelector(".hello input");
const helloBtn = document.querySelector(".hello button");
const userPage = document.querySelector("header h2 span");
const interFace = document.querySelector(".image");
const container = document.querySelector(".container");
const input = document.querySelector("#enter");
const add = document.querySelector(".add");
const list = document.querySelector(".list");
const mode = document.querySelector("header img");
// -----------------------------------------------------------------

// Hello Box

if (localStorage.getItem("User")) {
  hello.style.cssText = "display:none;";
  container.style.cssText = "display:block;";
  userPage.textContent = localStorage.getItem("User");
}

helloBtn.addEventListener("click", () => {
  if (inputUser.value !== "") {
    localStorage.User = inputUser.value;
    hello.style.cssText = "display:none;";
    container.style.cssText = "display:block;";
    userPage.textContent = inputUser.value;
  }
});

// MODe In Page Function
function lightMode() {
  mode.src = "images/icon-sun.svg";
  interFace.style.cssText =
    " background-image: url(images/bg-desktop-light.jpg);";
}
function darkMode() {
  mode.src = "images/icon-moon.svg";
  interFace.style.cssText =
    "  background-image: url(images/bg-desktop-dark.jpg);";
}

// Dark And Light Mode Set Local Storage
window.addEventListener("load", function () {
  if (window.localStorage.getItem("mode") === "dark") {
    body.classList.add(window.localStorage.getItem("mode"));
    darkMode();
  } else {
    lightMode();
  }
});

// Dark And Light Mode Changes In Page
mode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    darkMode();
    window.localStorage.setItem("mode", "dark");
  } else {
    lightMode();
    window.localStorage.setItem("mode", "light");
  }
});
// Func To Add Task In List
function creat(value) {
  let task = `<div class="habit">
 <span class="">
 <i class="fa-regular fa-circle"></i>
<i class="fa-solid fa-circle-check"></i>
</span>
<p class ="task">${value}</p>
<i class="fa-solid fa-pen-to-square"></i>
<i class="fa-solid fa-trash"></i>
</div>`;
  list.innerHTML += task;
}
// Func To Add Massege Box

function editBox() {
  let parent = document.querySelector(".edit");
  parent.classList.toggle("box");
  document.querySelector(".edit span").addEventListener("click", () => {
    if (parent.classList.contains("box")) {
      parent.classList.value = "edit";
    }
  });
}

// Add Tasks In Page;
add.addEventListener("click", () => {
  if (input.value !== "") {
    creat(input.value);
    input.value = "";
    checkTask();
    deletTask();
    num();
    edit();
    updateLocalStorage();
  }
});

// Func To Uppdate And Get LocalStorage

function updateLocalStorage() {
  window.localStorage.setItem("Tasks", list.innerHTML);
}
function getLocal() {
  list.innerHTML = localStorage.getItem("Tasks");
}

if (this.window.localStorage.getItem("Tasks")) {
  getLocal();
}

// Even In Task Delet , Check ,Edit

// Func To Check Task
function checkTask() {
  let chckbtn = document.querySelectorAll(".list div.habit span");
  chckbtn.forEach((done) => {
    done.addEventListener("click", () => {
      done.classList.toggle("check");
      done.parentElement.classList.toggle("complete");
      num();
      updateLocalStorage();
    });
  });
}

// Func To Delet Task
function deletTask() {
  let delbtn = document.querySelectorAll(".list div.habit i.fa-trash");
  delbtn.forEach((done) => {
    done.addEventListener("click", () => {
      done.parentNode.remove();
      num();
      updateLocalStorage();
    });
  });
}

// Func To Edit Task
function edit() {
  let editBtn = document.querySelectorAll(".list div.habit i:nth-child(3)");
  editBtn.forEach((e) => {
    e.addEventListener("click", (ele) => {
      // Access And Creat To Element
      let parent = ele.target.parentNode;
      let elementTask = parent.querySelector("p");
      let inputE = parent.querySelector("input");

      // First Condition
      if (ele.target.classList.value === "fa-solid fa-pen-to-square") {
        let inpu = document.createElement("input");
        inpu.value = elementTask.textContent;
        elementTask.replaceWith(inpu);
        ele.target.className = "fa-solid fa-square-check";
      } else {
        let newName = inputE.value;
        if (newName !== "") {
          let p = document.createElement("p");
          inputE.replaceWith(p);
          p.textContent = newName;
          p.classList.value = "task";
          parent.classList.remove("complete");
          parent.querySelector("span").classList.remove("check");
          ele.target.className = "fa-solid fa-pen-to-square";
          updateLocalStorage();
        } else {
          editBox();
        }
      }
    });
  });
}

// Func To Items Length
function num() {
  let num = document.querySelector(".item");
  num.textContent = `${document.querySelectorAll(".habit").length} items`;
}

// Btn To Clear All
let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("Tasks");
  list.innerHTML = "";
  num();
});

deletTask();
checkTask();
edit();
num();
