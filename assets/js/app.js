src = "https://www.gstatic.com/firebasejs/5.9.3/firebase.js"
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
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time").val("");
  $("#frequency-input").val("");
})


// add event listener for added child
database.ref().on("child_added", function (childSnapshot) {

  var trainData = childSnapshot.val();

  //convert first time to military time in moment
  var firstTimeConverted = moment(trainData.firstTime, "HHmm").subtract(1, "years");
  console.log(firstTimeConverted);


  //get current military time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HHmm"));

  // get difference between times
  var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("difference in time: " + timeDifference);

  // remainder of time apart
  var tRemainder = timeDifference % trainData.frequency;
  console.log(tRemainder);

  // how many minutes until next train
  var minutesUntilNextTrain = trainData.frequency - tRemainder;
  console.log(minutesUntilNextTrain);


  // next train will be arriving:
  var nextArrival = moment().add(minutesUntilNextTrain, "minutes");
  console.log(moment(nextArrival).format("HHmm"))
  var trainNextArrival = moment(nextArrival).format("HH:mm");
  console.log(trainNextArrival)


  //create table row
  var $tr = $('<tr>');
  //create <td> tags for each column
  var trainNameTd = $('<td>');

  var trainDestinationTd = $('<td>');

  var trainFrequencyTd = $('<td>');



  var trainNextArrivalTd = $('<td>');

  var trainMinutesAwayTd = $('<td>');


  // add data from childsnapshot val to td's
  trainNameTd.text(trainData.name);
  trainDestinationTd.text(trainData.destination);
  trainFrequencyTd.text(trainData.frequency);
  trainNextArrivalTd.text(trainNextArrival)
  trainMinutesAwayTd.text(minutesUntilNextTrain);

  // add td's to row
  $tr.append(trainNameTd, trainDestinationTd, trainFrequencyTd, trainNextArrivalTd, trainMinutesAwayTd)

  // stick the row to the table
  $("#tableBody").append($tr)
})

// function updateTime(){
  
// }

// setInterval(function(){
//   updateTime();
// },60000)