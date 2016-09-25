(function() {

  var app = angular.module("CubeCalendar", []);

  var MainController = function ($scope) {
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
      };


  };

  app.controller("MainController", ["$scope", MainController]);

}());