src="https://www.gstatic.com/firebasejs/5.9.3/firebase.js"
// reference firebase
  var config = {
    apiKey: "AIzaSyDQeKzmFdtKMsp3DOZx9xMGliMtkbxbwkE",
    authDomain: "train-scheduler-cba36.firebaseapp.com",
    databaseURL: "https://train-scheduler-cba36.firebaseio.com",
    projectId: "train-scheduler-cba36",
    storageBucket: "train-scheduler-cba36.appspot.com",
    messagingSenderId: "269597108300"
  };
  
  // Initialize Firebase
  firebase.initializeApp(config);



var database = firebase.database();


// make the form submit, and send data to firebase
$("#train-form").on("submit", function (event) {
  event.preventDefault();

  var trainInputData = {
    name: $("#train-name-input").val().trim(),
    destination: $("#destination-input").val().trim(),
    firstTime: $("#first-train-time").val().trim(),
    frequency: $("#frequency-input").val().trim()
  }
  database.ref().push(trainInputData);
})


// add event listener for added child
database.ref().on("child_added", function(childSnapshot){

  var trainData = childSnapshot.val();





  




  //create table row
  var $tr = $('<tr>');
  //create <td> tags for each column
  var trainNameTd = $('<td>');

  var trainDestinationTd = $('<td>');

  var trainFrequencyTd = $('<td>');

  var trainFirstTimeTd = $('<td>');

  var trainNextArrival = $('<td>');


  // add data from childsnapshot val to td's
  trainNameTd.text(trainData.name);
  trainDestinationTd.text(trainData.destination);
  trainFirstTimeTd.text(trainData.firstTime);
  trainFrequencyTd.text(trainData.frequency);

  // add td's to row
  $tr.append(trainNameTd, trainDestinationTd, trainFrequencyTd)

  // stick the row to the table
  $("#tableBody").append($tr)
})