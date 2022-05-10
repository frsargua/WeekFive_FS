// Get variable for input element
const taskFormEl = $("#taskForm");
const currentDayEl = $("#currentDay");
const divMainContEl = $("#main-container");
let currentTime = parseInt(moment().format("H"));
// let currentTime = 12;
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

// Generic timeblocks rendering function.
const renderTimeBlocks = (timeText, key) => {
  // Create div
  const divTimeBlockEl = $("<div>");
  //Add classes to div
  divTimeBlockEl.attr("class", "container-fluid d-flex p-0 pb-1");

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
  textAreaEl.attr("class", "form-control mr-1");

  const divButtonEl = $("<div>");
  divButtonEl.attr("class", "d-flex flex-column");

  //create button
  const buttonEl = $("<button>");
  //add attributes
  buttonEl.attr("data-key", key);
  buttonEl.attr("class", "btn btn-primary btn-sm");
  //add text
  buttonEl.text("Save");

  //create button
  const clearButtonEl = $("<button>");
  //add attributes
  clearButtonEl.attr("data-key-clear", key);
  clearButtonEl.attr("class", "btn btn-dark btn-sm");
  //add text
  clearButtonEl.text("Clear");

  divButtonEl.append(buttonEl, clearButtonEl);
  divTimeBlockEl.append(labelTextAreaEl, textAreaEl, divButtonEl);
  divMainContEl.append(divTimeBlockEl);
};

// This function iterates over the workingHours array of objects and utilizes its values to create a series of timeBlocks.
const iterateOverArray = () => {
  console.log("this is iterateOverArray");
  workingHours.forEach((index) => renderTimeBlocks(index.label, index.key));
};

// This function uses moment.js to obtain the current date, place it into the header and update it.
const renderDate = () => {
  var today = moment().format("h:mm:ssa , dddd, MMMM Do YYYY");
  currentDayEl.text(today);
};

// Checks the timeBlock's key and compares it against the current time to determine if they are a past/present/future events.
const changeTimeBlockColor = () => {
  const scheduleFromLS = loadFromLS();
  for (let i = 0; i < 9; i++) {
    let index = String(i + 9);
    let currentTimeBlock = $(`[id='${index}']`);

    if (index < currentTime) {
      currentTimeBlock.addClass("past");
      currentTimeBlock.attr("readonly", true);
    } else if (index == currentTime) {
      currentTimeBlock.addClass("present");
    } else {
      currentTimeBlock.addClass("future");
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

// This functions listens to the main container by getting the click action from its children through event-bubbling.
// This function saves the input text, as a key:value pair, into the local storage.
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
//This function deletes a key:value pair from the local storage.
const handleClear = (event) => {
  let target = $(event.target);
  let currentDKValue = target.attr("data-key-clear");
  if (target[0].tagName == "BUTTON") {
    let currentEl = $(`[data-textarea-key='${currentDKValue}']`);
    currentEl.val("");
    // If the textArea is empty you ignore this function and nothing is stored.
    // if (!textAreaInputText) {
    // return;
    saveToLS("schedule", currentDKValue, "");
  }
  // }
};

// Creates/Calls schedule object from local storage.
const initializeLS = () => {
  // Calling the schedule array from the local storage
  const scheduleFromLS = JSON.parse(localStorage.getItem("schedule"));

  // If the array is undefined, we create an empty array and push it to the local storage
  if (!scheduleFromLS) {
    localStorage.setItem("schedule", JSON.stringify({}));
  }
};
// Saves key: value pair into local storage
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

// When the page is loaded the onceLoaded function is called.
$(document).ready(onceLoaded);

// When the save button is clicked, the sibling text area is saved into the local storage.
divMainContEl.on("click", handleSave);

// When the clear button is clicked, the sibling text area is cleared and saved.
divMainContEl.on("click", handleClear);
