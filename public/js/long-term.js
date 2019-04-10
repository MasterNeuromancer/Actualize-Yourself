var $title = $("#title");
var $description = $("#description");
var $completedBy = flatpickr($("#completedBy"), { minDate: "today" });;
var $details = $("#details");

var handleFormSubmit = function (event) {
  event.preventDefault();

  var goal = {
    title: $title.val().trim(),
    description: $description.val().trim(),
    completedBy: $completedBy.selectedDates[0],
    details: $details.val().trim()
  };

  if (!(goal.title) || !(goal.description) || !(goal.completedBy)) {
    alert("Please submit a complete goal.");
    return;
  }

  function redirect() {
    window.location.replace("/");
  }

  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "PUT",
    url: "/api/long-term",
    data: JSON.stringify(goal)
  }).then(function () {
    console.log("GOT HERE");
    redirect();
  });
};

$("#submit").on("click", handleFormSubmit);
