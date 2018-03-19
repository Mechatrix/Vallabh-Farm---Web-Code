var movieFire = angular.module("MovieFire", ["firebase"]);
function MainController($scope, $firebase) {
$scope.favMovies = $firebase(new Firebase('https://trackyt-01.firebaseio.com/RFIDInfo/'));
$scope.movies = [];
$scope.favMovies.$on('value', function() {
$scope.movies = [];
var mvs = $scope.favMovies.$getIndex();
for (var i = 0; i < mvs.length; i++) {
$scope.movies.push({
RFID: $scope.favMovies[mvs[i]].RFID,
key: mvs[i]
});
};
});

$scope.saveToList = function(event) {
if (event.which == 13 || event.keyCode == 13) {
var mvName = $scope.mvName.trim();
if (mvName.length > 0) {
$scope.favMovies.$add({
RFID: mvName
});
movieName.value = ''; //movieName is the ID of  input box - Angular rocks!
}
}
}
$scope.edit = function(index) {
var mv = $scope.movies[index];
var newName = prompt("Update the movie name", mv.RFID); // to keep things simple and old skool :D
if (newName && newName.length > 0) {
// build the FB endpoint to the item in movies collection
var updateMovieRef = buildEndPoint(mv.RFID, $firebase);
updateMovieRef.$set({
RFID: newName
});
}
}
$scope.del = function(index) {
var mv = $scope.movies[index];
var response = confirm("Are certain about removing \"" + mv.RFID + "\" from the list?");
if (response == true) {
// build the FB endpoint to the item in movies collection
var deleteMovieRef = buildEndPoint(mv.RFID, $firebase);
deleteMovieRef.$remove();
}
}
}
function buildEndPoint(key, $firebase) {
return $firebase(new Firebase('https://trackyt-01.firebaseio.com/RFIDInfo/'+ key + "/" + "RFID"));
}

var rootRef = firebase.database();
var urlRef = rootRef.ref("/RFIDInfo");
urlRef.on("value", function(snapshot) {
    var childata = snapshot.val();
	var myJson = JSON.stringify(snapshot.val());
	var size = Object.keys(childata).length
	document.getElementById("CounterOut").innerHTML = size;
	//console.log(size);
	//console.log(childata);
	//console.log(isValidJson(childata));
	//console.log(isValidJson(myJson));
	searchKeyValue('Diff_in_time','23 Hours')
	
	
});


function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}

function searchKeyValue(childname,findvalue) {
  var ref = firebase.database().ref("/RFIDInfo");
  ref.orderByChild(childname).equalTo(findvalue).on("value",function (snapshot) {
	//console.log("There are "+snapshot.numChildren()+" messages");
	document.getElementById("CounterIn").innerHTML = snapshot.numChildren();
    snapshot.forEach(function(childSnapshot) {
	  var childVal = JSON.stringify(childSnapshot.val());
	  var val = childSnapshot.val();
	  console.log(val);
      //console.log(childVal);
    });
	//console.log("RFID:" + val['RFID'] + "||" + "In Time:" + val['Diff_in_time'])
  })
}

// Get the modal
var modal = document.getElementById('myModal');
var modal1 = document.getElementById('myModal1');

// Get the button that opens the modal
var btn = document.getElementById("myBtn","myBtn1");
var btn1 = document.getElementById("myBtn1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close1")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}
btn1.onclick = function() {
    modal1.style.display = "block";
}



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
span1.onclick = function() {
    modal1.style.display = "none";
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}