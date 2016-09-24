(function() {

  var app = angular.module("CubeCalendar", []);

  var MainController = function ($scope) {
      var xAngle = yAngle = 0;
      $scope.keyPress = function (keyCode) {
          switch (keyCode) {

              case 37: yAngle += 90; break;
              case 38: xAngle -= 90; break;
              case 39: yAngle -= 90; break;
              case 40: xAngle += 90; break;
          }
          document.getElementById('cube').style.transform = "rotateX(" + xAngle + "deg) rotateY(" + yAngle + "deg)";
      };
      
	
  };

  app.controller("MainController", ["$scope", MainController]);

}());