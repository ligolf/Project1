// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyAsL6rDw82BhQ0o3iK4fTFTPwj8p0Elxdw",
  authDomain: "project1-drunknscrew.firebaseapp.com",
  databaseURL: "https://project1-drunknscrew.firebaseio.com",
  projectId: "project1-drunknscrew",
  storageBucket: "project1-drunknscrew.appspot.com",
  messagingSenderId: "560380639013"
};

firebase.initializeApp(config);

var database = firebase.database();
console.log(database);
// 2. Button for adding Events - may need to change this to add different ids provided by tahir
$("#create-event").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var creatorName = $("#creator-name")
    .val()
    .trim();
  var eventAddress = $("#event-address")
    .val()
    .trim();
  var eventTime = $("#event-time")
    .val()
    .trim();
  var eventdescription = $("#event-description")
    .val()
    .trim();
  var eventCost = $("#event-cost")
    .val()
    .trim();
  var eventDate = moment(
    $("#event-date")
      .val()
      .trim(),
    "MM/DD/YYYY"
  ).format("X");

  // Creates local "temporary" object for holding event data
  var newEvent = {
    name: creatorName,
    address: eventAddress,
    time: eventTime,
    description: eventdescription,
    cost: eventCost,
    date: eventDate
  };

  // Uploads event data to the database
  database.ref().push(newEvent);

  // Logs everything to console
  console.log(newEvent.name);
  console.log(newEvent.address);
  console.log(newEvent.time);
  console.log(newEvent.cost);
  console.log(newEvent.date);
  console.log(newEvent.description);
  console.log("event successfully added");

  // Clears all of the text-boxes
  $("#creator-name").val("");
  $("event-address").val("");
  $("#event-date").val("");
  $("#event-time").val("");
  $("#event-cost").val("");
  $("#event-description").val("");
});

// 3. Create Firebase event for pulling events from the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var creatorName = childSnapshot.val().name;
  var eventAddress = childSnapshot.val().address;
  var eventTime = childSnapshot.val().time;
  var eventdescription = childSnapshot.val().description;
  var eventCost = childSnapshot.val().cost;
  var eventDate = childSnapshot.val().date;

  // event Info
  console.log(creatorName);
  console.log(eventAddress);
  console.log(eventTime);
  console.log(eventdescription);
  console.log(eventCost);
  console.log(eventDate);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(creatorName),
    $("<td>").text(eventAddress),
    $("<td>").text(eventTime),
    $("<td>").text(eventdescription),
    $("<td>").text(eventCost),
    $("<td>").text(eventDate)
  );



  // Append the new row to the table
  $("#event-table > tbody").append(newRow);
});
