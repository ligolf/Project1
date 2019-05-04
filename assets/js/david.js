// 1. Initialize Firebase
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
// 2. Button for adding Events - may need to change this to add different ids provided by tahir
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
  console.log('event successfully added');

  // Clears all of the text-boxes
  $('#creator-name-input').val('');
  $('event-address-input').val('');
  $('#event-date-input').val('');
  $('#event-time-input').val('');
  $('#event-cost-input').val('');
  $('#event-description-input').val('');
});

// 3. Create Firebase event for pulling events from the database and a row in the html when a user adds an entry
database.ref().on('child_added', function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var creatorNameOutput = childSnapshot.val().name;
  var eventAddressOutput = childSnapshot.val().address;
  var eventTimeOutput = childSnapshot.val().time;
  var eventdescriptionOutput = childSnapshot.val().description;
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
    $('<td>').text(creatorNameOutput),
    $('<td>').text(eventDateOutput),
    $('<td>').text(eventTimeOutput),
    $('<td>').text(eventCostOutput),
    $('<td>').text(eventAddressOutput),
    $('<td>').text(eventdescriptionOutput),
    $('<td>').html(joinButton)
  );

  // Append the new row to the table
  $('#new-event-listings > tbody').prepend(newRow);

  // // var mainDiv = $('#new-event-cards');
  // var createColDiv = $('<div>');
  // createColDiv.attr('class', 'col-lg-6');
  // // createColDiv.attr('id', 'col-lg-6');
  // var cardHeaderDiv = $('<div>');
  // // var cardHeaderDiv = $();
  // cardHeaderDiv.attr('class', 'card rounded');
  // var cardHeaderCol = $('<div>');
  // cardHeaderCol.attr('class', 'card-header event-card-header');
  // cardHeaderCol.attr('id', 'evet-card-header1');

  // var cardHeaderButtonInsert = $('#evet-card-header1');
  // var cardHeaderButton = $('<button>');
  // cardHeaderButton.attr('type', 'button');
  // cardHeaderButton.attr('class', 'btn btn-info');
  // cardHeaderButton.attr('data-toggle', 'modal');
  // cardHeaderButton.attr('data-target', '#event-join');
  // cardHeaderButton.text('JOIN');

  // var unOrderListStart = $('<ul>');
  // unOrderListStart.attr('class', 'list-group list-group-flush');
  // unOrderListStart.attr('id', 'item1');

  // // var listItem1 = $('#item1');
  // // var listItem1a = $('<li>');
  // // listItem1a.attr('id', 'creator-name1');

  // // createColDiv.text('MEOWWWWW');
  // // cardHeaderCol.text('MEOWWWWWW');

  // mainDiv.append(createColDiv);
  // createColDiv.append(cardHeaderDiv);
  // cardHeaderDiv.append(cardHeaderCol);
  // cardHeaderButtonInsert.append(cardHeaderButton);
  // cardHeaderDiv.append(unOrderListStart);
  // unOrderListStart.append(listItem1);

  // var createRounded = $('<div>');
  // createRounded.attr('class', 'card rounded');

  // var createCardHeader = $('<div>');
  // createCardHeader.attr('card-header event-card-header');
  // var costOutput = $('<div>').append(eventCostOutput);

  // var $('<div class="card rounded">');
  // $('<div class="card-header event-card-header">');
  // $('<button type="button" class="btn btn-info" data-toggle="modal" data-target="#event-join" >' + 'Join');
  // $('<div class="card-header event-card-header">');
  // Creating a paragraph tag with the result item's rating
  //   .text(creatorNameOutput),
  //   $('<td>').text(eventAddressOutput),
  //   $('<td>').text(eventTimeOutput),
  //   $('<td>').text(eventdescriptionOutput),
  //   $('<td>').text(eventCostOutput),
  //   $('<td>').text(eventDateOutput)
  // );
  // costOutput.append(createdHeader);
  // createRounded.append(createCardHeader);
  // createColDiv.append(createRounded);

  // // Append the new row to the table
  // $('#new-event-listings').prepend(createColDiv);
});

// var animalDiv = $('<div>');

// // Creating a paragraph tag with the result item's rating
// var p = $('<div>').text('Rating: ' + results[i].rating);

// // Creating and storing an image tag
// var animalImage = $('<img>');
// // Setting the src attribute of the image to a property pulled off the result item
// animalImage.attr('src', results[i].images.fixed_height_still.url);
// animalImage.attr('data-still', results[i].images.fixed_height.url);
// animalImage.attr('data-animate', results[i].images.fixed_height.url);
// animalImage.attr('class', 'gif');
// animalImage.attr('data-state', 'still');

// // Appending the paragraph and image tag to the animalDiv
// animalDiv.append(animalImage);
// animalDiv.append(p);

// // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
// $('#animal-pic').prepend(animalDiv);

// {
//   <div class="col-lg-6">
//     <div class="card rounded">
//       <div class="card-header event-card-header">
//         <button
//           type="button"
//           class="btn btn-info"
//           data-toggle="modal"
//           data-target="#event-join"
//         >
//           Join
//         </button>
//         <div class="dollar-cost" id="event-cost-output">
//           $ $ $ $ $
//         </div>
//         <div class="time" id="event-time1">
//           6:30 pm
//         </div>
//         <div class="event-date" id="event-date1">
//           4/27
//         </div>
//       </div>

//       <ul class="list-group list-group-flush">
//         <li class="list-group-item list-group-item-success" id="creator-name1">
//           <strong>Creator: </strong>Malcom Doe
//         </li>
//         <li class="list-group-item" id="event-address1">
//           <strong>Address: </strong>1234 Westwood Bl, Westwood, CA 90004
//         </li>
//         <li class="list-group-item" id="event-description1">
//           <strong>Description: </strong>Mix and match multiple content types to
//           create the card you need, or throw everything in there. Shown below
//           are image styles, blocks, text styles, and a list group—all wrapped in
//           a fixed-width card.
//         </li>
//       </ul>
//     </div>
//   </div>;
// }
