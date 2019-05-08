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

$('#create-event').on('click', function (event) {
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
  var eventNumber = $('#event-number-input')
    .val()
    .trim();

  var attendessCounter = $('#event-number-input')
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

    number: eventNumber,

    description: eventdescription,
    cost: eventCost,
    date: eventDate,
    attendees: attendessCounter,
    attendees_name: '',
    attendees_email: ''
  };

  // Uploads event data to the database

  var newPostRef = database.ref().push(newEvent);
  var ID = newPostRef.key;

  // Logs everything to console
  console.log("name:" + newEvent.name);
  console.log("address:" + newEvent.address);
  console.log("time:" + newEvent.time);
  console.log("cost:" + newEvent.cost);
  console.log("date:" + newEvent.date);
  console.log("number:" + newEvent.number);
  console.log("ID:" + ID)
  console.log("description:" + newEvent.description);


  console.log('event successfully added');

  // Clears all of the text-boxes

  $('#creator-name-input').val('');
  $('#event-address-input').val('');
  $('#event-date-input').val('');
  $('#event-time-input').val('');
  $('#event-cost-input').val('');
  $('#event-description-input').val('');
});

database.ref().on('child_added', function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var creatorNameOutput = childSnapshot.val().name;
  var attendeeNumberOutput = childSnapshot.val().number;
  var eventAddressOutput = childSnapshot.val().address;
  var eventTimeOutput = childSnapshot.val().time;
  var eventdescriptionOutput = childSnapshot.val().description;


  // eventdescriptionOutput.attr('class', 'hide-column');
  var eventCostOutput = childSnapshot.val().cost;
  var eventDateOutput = childSnapshot.val().date;

  var eventDatePrettyOutput = moment.unix(eventDateOutput).format('MM/DD/YYYY');
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
  console.log(eventDatePrettyOutput);
  console.log(eventCostOutput);


  // Create the new row
  var newRow = $('<tr>').append(
    $('<td class="px-2">').text(creatorNameOutput),

    $('<td class="px-2">').text(attendeeNumberOutput),

    $('<td class="px-2">').text(eventDatePrettyOutput),
    $('<td class="px-2">').text(eventTimeOutput),
    $('<td class="px-2">').text(eventCostOutput),
    $('<td class="px-2">').text(eventAddressOutput),
    $('<td class="px-2">').text(eventdescriptionOutput),
    $('<td class="join-mobile-button">').html(joinButton)
  );

  // Append the new row to the table
  $('#new-event-listings > tbody').prepend(newRow);
});

// listener for adding attendees
$('#join-event').on('click', function (event) {
  event.preventDefault();

  // Grabs user input
  var attendeesName = $('#attendee-name-input')
    .val()
    .trim();
  var attendeesEmail = $('#attendee-email-input')
    .val()
    .trim();

  var joinEvent = {
    attendees_name: attendeesName,
    attendees_email: attendeesEmail
  };

  // Uploads event data to the database
  database.ref().push(joinEvent);

  // Logs everything to console
  console.log(joinEvent.attendees_name);
  console.log(joinEvent.attendees_email);
  // console.log(postId);
  console.log('attendee successfully added');


  // Clears all of the text-boxes

  $('#attendee-name-input').val('');
  $('#attendee-email-input').val('');
});


const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#eceff1'
      }
    ]
  },
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#cfd8dc'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#b0bec5'
      }
    ]
  }
];

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:37.4268042, lng: -122.0828066},
    zoom: 13,
    styles: mapStyle
  });
}

console.log(map);