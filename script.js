(function() {

    var app = angular.module("CubeCalendar", []);

    var MainController = function ($scope, $window) {

        $scope.countTotal = $window.localStorage.length;

        var eventCycle = 3; // to be used with $scope.nextEvent
        // it is initialised with 3 because we want to cycle from the fourth event onwards
        // the first 3 events are on the first 3 faces so we don't need those


        var eventStoragePull = "";


        $scope.saveEvent = function (events) {

            $window.localStorage.setItem($scope.userTime, JSON.stringify(events));
            console.log($window.localStorage.getItem($scope.userTime));
          $scope.countTotal = $window.localStorage.length;

      };

        $scope.nextEvent = function () { // cycling on the fourth face for viewing/editing
            eventCycle++;
            if (eventCycle >= $scope.countTotal)
                eventCycle = $scope.countTotal - 1;



      };

        $scope.prevEvent = function () { //cycling on the fourth face for viewing/editing
            eventCycle--;
            if (eventCycle < 0)
                eventCycle = 0;


        };

      $scope.removeEvent = function () {
          $window.localStorage.removeItem($scope.userTime);
          $scope.countTotal = $window.localStorage.length;
          $window.alert("Event Removed!");
      };

        $scope.clearAll = function () {
            var r = $window.confirm("Are you sure? This will wipe every event you have saved!");
            if (r == true) {
                $window.localStorage.clear();
                $scope.countTotal = 0;
                $window.alert("All events have been cleared!");
            } else {
                $window.alert("Events not cleared!");
            }



        };


        var xAngle = 0;
        var yAngle = 0;
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