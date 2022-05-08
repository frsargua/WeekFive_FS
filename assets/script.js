// Get variable for input element
var taskFormEl = $("#taskForm");
var currentDayEl = $("#currentDay");

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

// This function uses moment.js to obtain the current date, place it into the header and update it.

const renderDate = () => {
  var today = moment().format("h:mm:ssa , dddd, MMMM Do YYYY");
  currentDayEl.text(today);
};

taskFormEl.on("click", "#9", handleSubmit);
setInterval(renderDate, 1000);
