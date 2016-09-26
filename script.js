(function() {

    var app = angular.module("CubeCalendar", []);

    var MainController = function ($scope, $window) {

        $scope.countTotal = $window.localStorage.length;

        var eventCycle = 3; // to be used with $scope.nextEvent
        // it is initialised with 3 because we want to cycle from the fourth event onwards
        // the first 3 events are on the first 3 faces so we don't need those
        var eventStoragePull = ""; // helps converting from localStorage to string array and splitting
                                   // the data into title,time,text



      $scope.saveEvent = function (event) {

          $window.localStorage.setItem("event" + $scope.countTotal, $scope.userTime +
              "|" + // using | as separator
              $scope.userTitle + "|" + $scope.userText);
          console.log($window.localStorage.getItem("event" + $scope.countTotal));
          $scope.countTotal = $window.localStorage.length;
      };

        $scope.nextEvent = function () { // cycling on the fourth face for viewing/editing
            eventCycle++;
            if (eventCycle >= $scope.countTotal)
                eventCycle = $scope.countTotal - 1;
            $scope.userTitle4 = $window.localStorage.getItem("event" + eventCycle);
            $scope.userTime4 = $window.localStorage.getItem("event" + eventCycle);
            $scope.userText4 = $window.localStorage.getItem("event" + eventCycle);


      };

        $scope.prevEvent = function () { //cycling on the fourth face for viewing/editing
            eventCycle--;
            if (eventCycle < 0)
                eventCycle = 0;
            $scope.userTitle4 = new Date();
            $scope.userTitle4 = $window.localStorage.getItem("event" + eventCycle);
            $scope.userTime4 = $window.localStorage.getItem("event" + eventCycle);
            $scope.userText4 = $window.localStorage.getItem("event" + eventCycle);

        };

      $scope.removeEvent = function () {
          $window.localStorage.removeItem("");
          $scope.countTotal = $window.localStorage.length;
      };

        $scope.clearAll = function () {
            $window.localStorage.clear();
            $scope.countTotal = 0;
            $window.alert("All events have been cleared!");
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
      };


  };

    app.controller("MainController", ["$scope", "$window", MainController]);

}());