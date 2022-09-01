var flag = 0;
var comment = angular.module('pinwall', ['firebase']);
var colorGradient;

function colorChooser(element) {

    colorGradient = element.id.split("_");
    colorGradient = colorGradient[1];

    console.log(colorGradient);
}

comment.controller('commentController', function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child('comments');
    $scope.comments = $firebaseArray(ref);

    // $scope.send = function() {
    angular.element(document.getElementById("sendButton")).bind('mouseup touchend', function(e) {

        console.log($scope.commentText);

        if (typeof($scope.commentText) != "undefined") {

            if (colorGradient == null) { colorGradient = 'blau' }

            if (flag == 0) {

                $scope.comments.$add({
                    comment: $scope.commentText,
                    color: colorGradient,
                    date: Date.now()
                });

                window.location = "mindshare.html";

                flag++;
            }

        } else {
            e.preventDefault();
        }

    });
})