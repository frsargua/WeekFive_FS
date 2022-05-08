// Get variable for input element
const taskFormEl = $("#taskForm");
const currentDayEl = $("#currentDay");
const divMainContEl = $("#main-container");

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

// taskFormEl.on("click", "#9", handleSubmit);  <-- Texting function - not working

// This function listens to the main container through event bubbling of its children.
const handleSave = (event) => {
  let target = $(event.target);
  let currentDKValue = target.attr("data-key");
  if (target[0].tagName == "BUTTON") {
    let currentEl = $(`[data-textarea-key='${currentDKValue}']`);
    let textAreaInputText = currentEl.val();
    // If the textArea is empty you ignore this function and nothing is stored.
    if (!textAreaInputText) {
      return;
    }
    // This saves the user's input text at that time as an object for later.
    const userSchedule = {
      currentDKValue,
      textAreaInputText,
    };
    console.log(userSchedule);
  }
};

const onceLoaded = () => {
  iterateOverArray();
  setInterval(renderDate, 1000);
};

$(document).ready(onceLoaded);
divMainContEl.on("click", handleSave);
