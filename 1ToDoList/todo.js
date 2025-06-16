// بسم الله الرحمن الرحيم
// [1] get HTML Elements
let UIList = document.getElementById("TaskList");
let AddBtn = document.getElementById("AddBtn");
let FilterBtns = document.querySelectorAll(".filter-buttons button");
let TaskCounter = document.getElementById("TaskCount");
let TasksList = JSON.parse(localStorage.getItem("TasksList")) || [];
// let TasksList = [];
let Filter = "All";

// ==

let textInput = document.getElementById("textInput");
let StateInput = document.getElementById("StateInput");
let PeriorityInput = document.getElementById("PeriorityInput");
let popUpBtn = document.getElementById("popUpBtn");
let popupOverlay = document.getElementById("popupOverlay");

const UpdateCounter = () => {
  const RemainigTasks = TasksList.filter((t) => !t.complete).length;
  TaskCounter.innerHTML = `${RemainigTasks} Task Remaining`;
};

const SaveTasks = () => {
  localStorage.setItem("TasksList", JSON.stringify(TasksList));
};

// Render Method (Show Tasks in Page and Filteration Section).
const RenderTasks = () => {
  UIList.innerHTML = "";
  const FilterationTasks = TasksList.filter((t) => {
    if (Filter == "All") {
      return true;
    }
    if (Filter == "Active") {
      return !t.complete;
    }
    if (Filter == "Completed") {
      return t.complete;
    }
  });

  FilterationTasks.forEach((t, index) => {
    let item = document.createElement("li");

    let CheckBox = document.createElement("input");
    CheckBox.type = "checkbox";
    CheckBox.checked = t.complete;
    CheckBox.className = "form-check-input";
    CheckBox.addEventListener("change", () => ToggleState(index));
    let ItemText = document.createElement("h5");
    ItemText.textContent = t.text;
    let Div = document.createElement("div");
    Div.className = "Div";
    Div.appendChild(CheckBox);
    Div.appendChild(ItemText);
    let BtnsContainer = document.createElement("div");
    BtnsContainer.className = "BtnsContainer";

    let UpdateBtn = document.createElement("button");
    UpdateBtn.textContent = "Update";
    UpdateBtn.addEventListener("click", () => UpdateTask(index));
    let DeleteBtn = document.createElement("button");
    DeleteBtn.textContent = "Delete";
    DeleteBtn.addEventListener("click", () => DeleteTask(index));

    BtnsContainer.appendChild(UpdateBtn);
    BtnsContainer.appendChild(DeleteBtn);

    let taskInfoContainer = document.createElement("div");
    taskInfoContainer.className = "taskInfoContainer";

    let Status = document.createElement("span");
    Status.classList = "Status";
    Status.textContent = t.Status;

    // let Perior = document.createElement("span");
    // Perior.classList = "Periority";
    // Perior.textContent = t.Periority;

    taskInfoContainer.appendChild(Status);

    item.appendChild(Div);
    item.appendChild(taskInfoContainer);
    item.appendChild(BtnsContainer);
    UIList.appendChild(item);
  });
  UpdateCounter(); // => Increment Counter To Show 1
};
const ShowPopUp = () => {
  popupOverlay.classList.remove("hide");
  popupOverlay.classList.add("show");
};
AddBtn.addEventListener("click", ShowPopUp);

const getPopUpData = (e) => {
  e.preventDefault();
  let InputText = textInput.value.trim();
  let InputStatus = StateInput.value;
  let InputPerior = PeriorityInput.value;
  if (InputText) {
    let Task = {
      text: InputText,
      complete: false,
      Status: InputStatus,
      Periority: InputPerior,
    };
    TasksList.push(Task);
    InputText.value = "";
    SaveTasks();
    RenderTasks();
  }
  popupOverlay.classList.remove("show");
  popupOverlay.classList.add("hide");
};

popUpBtn.addEventListener("click", getPopUpData);

const ToggleState = (index) => {
  TasksList[index].complete = !TasksList[index].complete;
  SaveTasks();
  RenderTasks();
};

const UpdateTask = (index) => {
  let Prompt = prompt("Enter New Task name?");
  TasksList[index].text = Prompt;
  SaveTasks();
  RenderTasks();
};

const DeleteTask = (index) => {
  TasksList.splice(index, 1);
  SaveTasks();
  RenderTasks();
};

FilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    FilterBtns.forEach((b) => {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    Filter = btn.textContent;
    RenderTasks();
  });
});

document.onload = RenderTasks();
