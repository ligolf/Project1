var config = {
  apiKey: 'AIzaSyAsL6rDw82BhQ0o3iK4fTFTPwj8p0Elxdw',
  authDomain: 'project1-drunknscrew.firebaseapp.com',
  databaseURL: 'https://project1-drunknscrew.firebaseio.com',
  projectId: 'project1-drunknscrew',
  storageBucket: 'project1-drunknscrew.appspot.com',
  messagingSenderId: '560380639013'
};

firebase.initializeApp(config);

var database = firebase.database();
console.log(database);

$('#create-event').on('click', function(event) {
  event.preventDefault();

  // Grabs user input
  var creatorName = $('#creator-name-input')
    .val()
    .trim();
  var eventAddress = $('#event-address-input')
    .val()
    .trim();
  var eventTime = $('#event-time-input')
    .val()
    .trim();

  var eventdescription = $('#event-description-input')
    .val()
    .trim();
  var eventCost = $('#event-cost-input')
    .val()
    .trim();
  var eventDate = moment(
    $('#event-date-input')
      .val()
      .trim(),
    'MM/DD/YYYY'
  ).format('X');

  var newEvent = {
    name: creatorName,
    address: eventAddress,
    time: eventTime,
    // number: eventNumber,
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
  console.log(newEvent.number);
  console.log(newEvent.description);
  console.log('event successfully added');

  // Clears all of the text-boxes

  $('#creator-name-input').val('');
  $('event-address-input').val('');
  $('#event-date-input').val('');
  $('#event-time-input').val('');
  $('#event-cost-input').val('');
  $('#event-description-input').val('');
});

database.ref().on('child_added', function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var creatorNameOutput = childSnapshot.val().name;
  var eventAddressOutput = childSnapshot.val().address;
  var eventTimeOutput = childSnapshot.val().time;
  var eventdescriptionOutput = childSnapshot.val().description;
  // eventdescriptionOutput.attr('class', 'hide-column');
  var eventCostOutput = childSnapshot.val().cost;
  var eventDateOutput = childSnapshot.val().date;
  var joinButton = $('<button>');
  joinButton.attr('type', 'button');
  joinButton.attr('class', 'btn btn-info');
  joinButton.attr('data-toggle', 'modal');
  joinButton.attr('data-target', '#event-join');
  joinButton.text('JOIN');

  // event Info
  console.log(creatorNameOutput);
  console.log(eventAddressOutput);
  console.log(eventTimeOutput);
  console.log(eventdescriptionOutput);
  console.log(eventCostOutput);
  console.log(eventDateOutput);

  // Create the new row
  var newRow = $('<tr>').append(
    $('<td class="px-2">').text(creatorNameOutput),
    $('<td class="px-2">').text(eventDateOutput),
    $('<td class="px-2">').text(eventTimeOutput),
    $('<td class="px-2">').text(eventCostOutput),
    $('<td class="px-2">').text(eventAddressOutput),
    $('<td class="px-2">').text(eventdescriptionOutput),
    $('<td class="join-mobile-button">').html(joinButton)
  );

  // Append the new row to the table
  $('#new-event-listings > tbody').prepend(newRow);
});
