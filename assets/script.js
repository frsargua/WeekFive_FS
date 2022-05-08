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
    key: 9,
  },
  {
    label: "11am",
    key: 9,
  },
  {
    label: "12pm",
    key: 9,
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

// I need to create a function that can record the input of an input container
const handleSubmit = (event) => {
  event.preventDefault();
  let target = event.target.nextElementSibling;
  console.log(this);
  let newTarge = $(this).siblings("input").console.log(target);
  console.log(newTarge);
  let eventInputText = $('input[name="workPlanner"]').val();
  console.log(eventInputText);
};

const renderTimeBlocks = () => {
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
  labelTextAreaEl.attr("for", "VALUE FROM ARRAY");
  //add text from object;
  labelTextAreaEl.text("TEXT FROM ARRAY");

  // Create textarea inside textarea
  const textAreaEl = $("<textarea>");
  //add attributes
  textAreaEl.attr("data-textarea-key", "VALUE 1 FROM ARRAY OF OBJECTS");
  textAreaEl.attr("rows", "2");
  textAreaEl.attr("id", "VALUE 1 FROM ARRAY OF OBJECTS");
  textAreaEl.attr("class", "form-control");

  //create button
  const buttonEl = $("<button>");
  //add attributes
  buttonEl.attr("data-key", "Value0");
  buttonEl.attr("class", "btn btn-primary btn-sm");
  //add text
  buttonEl.text("Save");

  divTimeBlockEl.append(labelTextAreaEl, textAreaEl, buttonEl);
  divMainContEl.append(divTimeBlockEl);
};

// This function uses moment.js to obtain the current date, place it into the header and update it.
const renderDate = () => {
  var today = moment().format("h:mm:ssa , dddd, MMMM Do YYYY");
  currentDayEl.text(today);
};

taskFormEl.on("click", "#9", handleSubmit);

const onceLoaded = () => {
  setInterval(renderDate(), 1000);
  renderTimeBlocks();
};

$(document).ready(onceLoaded);
