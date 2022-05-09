// Get variable for input element
const taskFormEl = $("#taskForm");
const currentDayEl = $("#currentDay");
const divMainContEl = $("#main-container");
let currentTime = parseInt(moment().format("H"));
console.log(currentTime);
// Working hours object
const workingHours = [
  {
    label: "9am",
    key: 9,
  },
  {
    label: "10am",
    key: 10,
  },
  {
    label: "11am",
    key: 11,
  },
  {
    label: "12pm",
    key: 12,
  },
  {
    label: "1pm",
    key: 13,
  },
  {
    label: "2pm",
    key: 14,
  },
  {
    label: "3pm",
    key: 15,
  },
  {
    label: "4pm",
    key: 16,
  },
  {
    label: "5pm",
    key: 17,
  },
];

// I need to create a function that can record the input of an input container   <-- Texting function - not working
// const handleSubmit = (event) => {
//   event.preventDefault();
//   let target = event.target.nextElementSibling;
//   console.log(this);
//   let newTarge = $(this).siblings("input").console.log(target);
//   console.log(newTarge);
//   let eventInputText = $('input[name="workPlanner"]').val();
//   console.log(eventInputText);
// };

const renderTimeBlocks = (timeText, key) => {
  // Create div
  const divTimeBlockEl = $("<div>");
  //Add classes to div
  divTimeBlockEl.attr("class", "container-fluid d-flex p-0");

  // Create label inside the div
  const labelTextAreaEl = $("<label>");
  //add attributes
  labelTextAreaEl.attr(
    "class",
    "col-2 border-top d-flex align-items-center justify-content-center p-0  m-0"
  );
  labelTextAreaEl.attr("for", key);
  //add text from object;
  labelTextAreaEl.text(timeText);

  // Create textarea inside textarea
  const textAreaEl = $("<textarea>");
  //add attributes
  textAreaEl.attr("data-textarea-key", key);
  textAreaEl.attr("rows", "2");
  textAreaEl.attr("id", key);
  textAreaEl.attr("class", "form-control");

  //create button
  const buttonEl = $("<button>");
  //add attributes
  buttonEl.attr("data-key", key);
  buttonEl.attr("class", "btn btn-primary btn-sm");
  //add text
  buttonEl.text("Save");

  divTimeBlockEl.append(labelTextAreaEl, textAreaEl, buttonEl);
  divMainContEl.append(divTimeBlockEl);
};

// This function iterates over the workingHours array of objects.
const iterateOverArray = () => {
  console.log("this is iterateOverArray");
  workingHours.forEach((index) => renderTimeBlocks(index.label, index.key));
};

// This function uses moment.js to obtain the current date, place it into the header and update it.
const renderDate = () => {
  var today = moment().format("h:mm:ssa , dddd, MMMM Do YYYY");
  currentDayEl.text(today);
};

const changeTimeBlockColor = () => {
  const scheduleFromLS = loadFromLS();
  for (let i = 0; i < 9; i++) {
    let index = String(i + 9);
    let currentTimeBlock = $(`[id='${index}']`);

    if (index < currentTime) {
      currentTimeBlock.addClass("past");
    } else if (index == currentTime) {
      currentTimeBlock.addClass("present");
    }
  }

  let secondIndex = 9;
  for (const element of scheduleFromLS) {
    let currentTimeBlock = $(`[id='${secondIndex}']`);

    if (element[0] == secondIndex) {
      currentTimeBlock.text(element[1]);
    }
    secondIndex++;
  }
};

// This function listens to the main container through event bubbling of its children.
const handleSave = (event) => {
  let target = $(event.target);
  let currentDKValue = target.attr("data-key");
  console.log(typeof currentDKValue);
  if (target[0].tagName == "BUTTON") {
    let currentEl = $(`[data-textarea-key='${currentDKValue}']`);
    let textAreaInputText = currentEl.val();
    // If the textArea is empty you ignore this function and nothing is stored.
    if (!textAreaInputText) {
      // return;
      saveToLS("schedule", currentDKValue, "");
    } else {
      // This saves the user's input text at that time as an object for later.
      saveToLS("schedule", currentDKValue, textAreaInputText);
    }
  }
};

const initializeLS = () => {
  // Calling the schedule array from the local storage
  const scheduleFromLS = JSON.parse(localStorage.getItem("schedule"));

  // If the array is undefined, we create an empty array and push it to the local storage
  if (!scheduleFromLS) {
    localStorage.setItem("schedule", JSON.stringify({}));
  }
};

const saveToLS = (location, key, value) => {
  // Calls the local storage object.
  const arrayFromLS = JSON.parse(localStorage.getItem(location));

  // Adds a new value to the object
  arrayFromLS[key] = value;

  // Saves the new object to the local storage
  localStorage.setItem(location, JSON.stringify(arrayFromLS));
};

const loadFromLS = () => {
  // Getting the object from local storage.
  const arrayFromLS = Object.entries(
    JSON.parse(localStorage.getItem("schedule"))
  );
  console.log(arrayFromLS);
  return arrayFromLS;
};

const onceLoaded = () => {
  initializeLS();
  iterateOverArray();
  setInterval(renderDate, 1000);
  changeTimeBlockColor();
};

$(document).ready(onceLoaded);
divMainContEl.on("click", handleSave);
