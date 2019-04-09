var $title = $("#title");
var $description = $("#description");
var $completedBy = $("#completedBy");
var $details = $("#details");


var API = {
  saveGoal: function(goal) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "PUT",
      url: "/api/long-term",
      data: JSON.stringify(goal)
    });
  },
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var goal = {
    title: $title.val().trim(),
    description: $description.val().trim(),
    completedBy: $completedBy.val().trim(),
    details: $details.val().trim()
  };

  if (!(goal.title) || !(goal.description) || !(goal.completedBy) ) {
    alert("Please submit a complete goal.");
    return;
  }

  function redirect() {
    window.location.replace("/");
  }

  API.saveGoal(goal).then(function(){
    console.log("GOT HERE");
    redirect();
  });
};

$("#submit").on("click", handleFormSubmit);
