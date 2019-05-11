$(document).ready(function() {
  // firebase link code and API Key
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
  // console.log(database);


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
    // console.log("name:" + newEvent.name);
    // console.log("address:" + newEvent.address);
    // console.log("time:" + newEvent.time);
    // console.log("cost:" + newEvent.cost);
    // console.log("date:" + newEvent.date);
    // console.log("number:" + newEvent.number);
    // console.log("ID:" + ID)
    // console.log("description:" + newEvent.description);

    console.log('event successfully added');

    // Clears all of the text-boxes

    $('#creator-name-input').val('');
    $('#event-address-input').val('');
    $('#event-date-input').val('');
    $('#event-time-input').val('');
    $('#event-cost-input').val('');
    $('#event-description-input').val('');
  });

  database.ref().on('child_added', function(childSnapshot) {
    // console.log(childSnapshot.val());

    // Store everything into a variable.
    var creatorNameOutput = childSnapshot.val().name;
    var attendeeNumberOutput = childSnapshot.val().number;
    var eventAddressOutput = childSnapshot.val().address;
    var eventTimeOutput = childSnapshot.val().time;
    var eventdescriptionOutput = childSnapshot.val().description;

    // eventdescriptionOutput.attr('class', 'hide-column');
    var eventCostOutput = childSnapshot.val().cost;
    var eventDateOutput = childSnapshot.val().date;

    var eventDatePrettyOutput = moment
      .unix(eventDateOutput)
      .format('MM/DD/YYYY');
    var joinButton = $('<button>');
    joinButton.attr('type', 'button');
    joinButton.attr('class', 'btn btn-info');
    joinButton.attr('data-toggle', 'modal');
    joinButton.attr('data-target', '#event-join');
    joinButton.text('JOIN');

    // event Info
    // console.log(creatorNameOutput);
    // console.log(eventAddressOutput);
    // console.log(eventTimeOutput);
    // console.log(eventdescriptionOutput);
    // console.log(eventDatePrettyOutput);
    // console.log(eventCostOutput);

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

    allAddresses.push(eventAddressOutput);
    var myJSON = JSON.stringify(allAddresses);

    window.allAddresses;
  });

  // moving
  //   $('#googleMap').prepend(eventAddressOutput);
  // });

  // listener for adding attendees
  $('#join-event').on('click', function(event) {
    event.preventDefault();


database.ref().on('child_added', function(childSnapshot) {
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
$('#event-join').on('click', function(event) {
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


    // // Logs everything to console
    // console.log(joinEvent.attendees_name);
    // console.log(joinEvent.attendees_email);
    // // console.log(postId);
    // console.log('attendee successfully added');

    //Friday Night testing erase this line later

    // Clears all of the text-boxes

    $('#attendee-name-input').val('');
    $('#attendee-email-input').val('');
  });
});



//Create a node at firebase location to add locations as child keys
//   var locationsRef = firebase.database().ref("eventAddressOutput");

// creating an array outside of the functions to pass informstion between the functions
var allAddresses = [];
var myJSON = JSON.stringify(allAddresses);


// console.log(allAddresses);

// google map time

function initMap() {





// var dot = { lat: latitude, lng: longitude };
//   var bounds = new google.maps.LatLngBounds();
//   locationsRef.on('child', function (snapshot) {
//     console.log(snapshot)
//     var data = snapshot.val();
//     console.log(data);
//     var marker = new google.maps.Marker({
//       position: {
//         lat: latitude,
//         lng: longitude
//       },
//       map: map
//     });
//     bounds.extend(marker.getPosition());
//     marker.addListener('click', (function (data) {
//       return function (e) {
//         infowindow.setContent(this.getPosition().toUrlValue(6) + "<br>" + data.User.g);
//         infowindow.open(map, this);
//       }
//     }(data)));
//     map.fitBounds(bounds);
//   });
// }
// google.maps.event.addDomListener(window, "load", initialize);

// src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAC2cAJA7U2M48ifiZpjMKRzrFNBYal9fc&callback=initMap"


  // $((indAddresses) => {
  //   initMap = function () {
  // var map, infoWindow;

  // var geocoder = new google.maps.Geocoder();





// var geocoder = new google.maps.Geocoder();
// var address = eventAddressOutput;

// geocoder.geocode({ 'address': address }, function (results, status) {

//   if (status == google.maps.GeocoderStatus.OK) {
//     var latitude = results[0].geometry.location.lat();
//     var longitude = results[0].geometry.location.lng();
//     // alert(latitude + ", " + longitude);

//   }
//   // var myLatlng = new google.maps.LatLng(parseFloat(results.geo.lat), parseFloat(results.geo.lon));
//   var dot = { lat: latitude, lng: longitude };

//   map = new google.maps.Map(
//     document.getElementById('googleMap'),
//     {
//       center: {
//         lat: 34.052234,
//         lng: -118.243685
//       },
//       zoom: 9
//     }
//   );

//   var marker = new google.maps.Marker({
//     position: dot,
//     map: map,

//   });
//   marker.addListener('click', function () {
//     infowindow.open(map, marker);
//   });
// });

// infoWindow = new google.maps.InfoWindow();
// google.maps.event.addListener(map, 'click', function (event) {
//   addMarker({
//     coords: (latitude + " " + longitude)
//   });
// });

// Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         var pos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//         infoWindow.setPosition(pos);
//         infoWindow.setContent('Location found.');
//         infoWindow.open(map);
//         map.setCenter(pos);
//       },
//       function () {
//         handleLocationError(true, infoWindow, map.getCenter());
//       }
//     );
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }

// function handleLocationError(
//   browserHasGeolocation,
//   infoWindow,
//   pos
// ) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? 'Error: The Geolocation service failed.'
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }

 // console.log(typeof eventAddressOutput)
  // for (i = 0; i < allAddresses.length; i++) {



  // var address1 = eventAddressOutput2;

  // var address = "1284 sepulveda Blvd, Los Angeles, CA";

  // // console.log(typeof eventAddressOutput)

  // geocoder.geocode({ 'address': address }, function (results, status) {
  //   if (status == google.maps.GeocoderStatus.OK) {
  //     var latitude = results[0].geometry.location.lat();
  //     var longitude = results[0].geometry.location.lng();
  //     // alert(latitude + ", " + longitude);

  //   }

  //   var dot = { lat: latitude, lng: longitude };

  //   map = new google.maps.Map(
  //     document.getElementById('googleMap'),
  //     {
  //       center: {
  //         lat: 34.052234,
  //         lng: -118.243685
  //       },
  //       zoom: 9
  //     }
  //   );


  // var marker = new google.maps.Marker({
  //   position: dot,
  //   map: map,

  // });



  var address = '1287 san vicente blvd. los angeles, CA';

  // marker.addListener('click', function () {
  //   infowindow.open(map, marker);
  // });


  console.log(allAddresses);


  geocoder.geocode({ address: address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      // alert(latitude + ", " + longitude);
    }

  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 10,
    center: new google.maps.LatLng(34.1123, -118.28494),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow;


  var marker, i;


    map = new google.maps.Map(document.getElementById('googleMap'), {
      center: {
        lat: 34.052234,
        lng: -118.243685
      },
      zoom: 9
    });
    var marker = new google.maps.Marker({
      position: dot,
      map: map
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  });

  for (i = 0; i < allAddresses.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(allAddresses[i][1], allAddresses[i][2]),
      map: map
    });
    console.log(typeof allAddresses);
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(allAddresses[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));

  }


  // });


  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      },

      function() {

        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  // }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
}


// };
