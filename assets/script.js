// Get variable for input element
var taskFormEl = $("#taskForm");

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

taskFormEl.on("click", "#9", handleSubmit);
