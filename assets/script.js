// Get variable for input element
var taskFormEl = $("#taskForm");
var currentDayEl = $("#currentDay");
var today = moment().format("h:mma , dddd, MMMM Do YYYY");

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
  timeIntervals = setInterval(function () {
    currentDayEl.text(today);
  }, 1000);
};

taskFormEl.on("click", "#9", handleSubmit);
renderDate();
