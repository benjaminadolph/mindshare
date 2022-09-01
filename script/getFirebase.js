var comment = angular.module('pinwall', ['firebase'] );
// Comments aus Firebase
var commentsArray = [];
var count = 0;
var textArray;



comment.controller('commentController', function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child('comments');
    $scope.comments = $firebaseArray( ref );

    ref.on('value', function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
            commentsArray[count] = childSnapshot.val();
            count++;
        });

        textArray = commentsArray;
        armain(commentsArray);
    });

})

//wird schon vor comment controller aufgerufne


//commentsArray[0] = {firstName:"J22ohn", lastName:"Doe", age:46};
//console.log(commentsArray);
//console.log(commentsArray[1].comment);


