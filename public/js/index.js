var $name = $("#name-text")
var $what = $("#what-description");
var $who = $("#who-description");
var $enjoy = $("#enjoy-description");


var API = {
  saveUser: function(user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "PUT",
      url: "api/profile",
      data: JSON.stringify(user)
    });
  },
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var user = {
    name: $name.val().trim(),
    nouns: $what.val().split(","),
    verbs:$who.val().split(","),
    adjectives: $enjoy.val().split(",")
  };

  if (!(user.name)) {
    alert("At a minimum, please provide your name!");
    return;
  }

  API.saveUser(user).then(function() {
  });

  $name.val("");
  $what.val("");
  $who.val("");
  $enjoy.val("");
};

$("#submit").on("click", handleFormSubmit);





///// UNNECESSARY FROM STARTER CODE 





// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };



// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
