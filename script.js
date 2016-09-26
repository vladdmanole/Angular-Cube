(function() {

    var app = angular.module("CubeCalendar", []);

  var MainController = function ($scope) {

      $scope.countTotal = 0;

      $scope.saveEvent = function () {
          var savedata = $scope.userTime + " " + $scope.userText + " " + $scope.userTitle;
          $scope.countTotal = $scope.countTotal + 1;
      };


      $scope.saveEvent = function (event) {
          localStorage.setItem("title" + $scope.countTotal, $scope.userTitle);
          localStorage.setItem("text" + $scope.countTotal, $scope.userText);
          localStorage.setItem("date" + $scope.countTotal, $scope.userTime);
      };

      $scope.getEvent = function () {
          console.log(document.getElementById("result").innerHTML = localStorage.getItem("title" + $scope.countTotal));
      };

      $scope.removeEvent = function () {
          $scope.removeEvent()
      };

      var xAngle = yAngle = 0;
      $scope.keyPress = function (keyCode) {
          switch (keyCode) {

              case 37:
                  yAngle += 90;

                  break; // left
              case 38:
                  xAngle -= 90;

                  break; // up
              case 39:
                  yAngle -= 90;

                  break; // right
              case 40:
                  xAngle += 90;

                  break; // down
          }
          document.getElementById('cube').style.transform = "rotateX(" + xAngle + "deg) rotateY(" + yAngle + "deg)";
      }


  };

  app.controller("MainController", ["$scope", MainController]);

}());