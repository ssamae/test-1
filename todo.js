const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const htmlPeddingList = document.querySelector(".js-pendingList");
const htmpFinishedList = document.querySelector(".js-finishedList");

let toDoListPedding = [];
let toDoListFinished = [];

function deleteToDoList(event) {
  console.log("deleteToDoList");

  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  const ulClassName = ul.className;

  if (ulClassName === "js-pendingList") {
    htmlPeddingList.removeChild(li);

    const cleanToDos = toDoListPedding.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });

    toDoListPedding = cleanToDos;
  }

  if (ulClassName === "js-finishedList") {
    htmpFinishedList.removeChild(li);
    const cleanToDos = toDoListFinished.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });

    toDoListFinished = cleanToDos;
    console.log(toDoListFinished);
  }

  saveToDoList();
}

function MoveTodoList(event) {
  let btn = event.target;
  let li = btn.parentNode;
  let ul = li.parentNode;

  let ulClassName = ul.className;

  if (ulClassName === "js-pendingList") {
    const obj = toDoListPedding.find(function (toDo) {
      return toDo.id === parseInt(li.id);
    });

    let text = obj.text;

    htmlPeddingList.removeChild(li);
    const cleanToDos = toDoListPedding.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDoListPedding = cleanToDos;
    paintToDoList(text, "FINISHED");

    console.log("pedding->fi", text);
  }

  if (ulClassName === "js-finishedList") {
    const obj = toDoListFinished.find(function (toDo) {
      return toDo.id === parseInt(li.id);
    });

    let text = obj.text;

    htmpFinishedList.removeChild(li);

    const cleanToDos = toDoListFinished.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });

    toDoListFinished = cleanToDos;
    paintToDoList(text, "PEDDING");
    console.log("fi->pe", text);
  }

  saveToDoList();
}

function saveToDoList() {
  console.log("saveToDoList");

  localStorage.setItem("PEDDING", JSON.stringify(toDoListPedding));
  localStorage.setItem("FINISHED", JSON.stringify(toDoListFinished));
}

// 화면에 ToDoList 그리기
function paintToDoList(inputText, pos) {
  console.log("paintToDoList");
  const li = document.createElement("li");
  const delbtn = document.createElement("button");
  const moveBtn = document.createElement("button");
  const span = document.createElement("span");

  if (pos === "PEDDING") {
    //const newId = toDoListPedding.length+1
    const newId = Date.now();

    delbtn.innerText = "❌";
    moveBtn.innerText = "❤";
    delbtn.addEventListener("click", deleteToDoList);
    moveBtn.addEventListener("click", MoveTodoList);
    span.innerText = inputText;

    li.appendChild(delbtn);
    li.appendChild(moveBtn);
    li.appendChild(span);
    li.id = newId;

    htmlPeddingList.appendChild(li);

    const toDoListObj = {
      id: newId,
      text: inputText
    };

    toDoListPedding.push(toDoListObj);
  }

  if (pos === "FINISHED") {
    const newId = Date.now();

    delbtn.innerText = "❌";
    moveBtn.innerText = "💔";
    delbtn.addEventListener("click", deleteToDoList);
    moveBtn.addEventListener("click", MoveTodoList);
    span.innerText = inputText;

    li.appendChild(delbtn);
    li.appendChild(moveBtn);
    li.appendChild(span);
    li.id = newId;

    htmpFinishedList.appendChild(li);

    const toDoListObj = {
      id: newId,
      text: inputText
    };

    toDoListFinished.push(toDoListObj);
  }

  saveToDoList();
}

// form 에서 전송 발생 시 이벤트핸들러
function handleSubmit(event) {
  console.log("handlesubmit");
  event.preventDefault(); // 이벤트 버블 금지

  const currentInputValue = toDoInput.value;
  paintToDoList(currentInputValue, "PEDDING");

  toDoInput.value = null;
}

function storageGetItem(pos) {
  const loadedToDos = localStorage.getItem(pos);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (loadList) {
      paintToDoList(loadList.text, pos);
      console.log(loadList.text, pos);
    });
  }
}

function loadToDoList() {
  console.log("loadToDoList");

  storageGetItem("PEDDING");

  storageGetItem("FINISHED");
}

// 초기화 함수
function init() {
  loadToDoList();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
