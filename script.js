(function() {

    var app = angular.module("CubeCalendar", []);

    var MainController = function ($scope, $window) {

        var dateComparator = function (a, b) { // LEXICOGRAPHICAL SORT! ISO8601 IS THE BEST
            return a.userTime > b.userTime;
        };


        var eventCycle = 3; // "magic number" 3 is the fourth event which is the default event
// for the fourth face
        $scope.cycle = eventCycle;

        if ($window.localStorage.length == 0) {
            console.log("wow");// this JSON magical incantation happens only the first time someone starts THE CUBE and has no data
            $window.localStorage.setItem("eventSave", JSON.stringify({
                "events": [{
                    "userTime": "2020-11-05T08:15:30+03:00",
                    "userTitle": "My First EventText TextText Text Text Text Text Text Text Text Text Text Text Text  Text Text Text Text Text Text Text Text Text Text ",
                    "userText": "Text 1"

                }, {
                    "userTime": "2017-11-05T08:15:30+03:00",
                    "userTitle": "My Secon EventText Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text ",
                    "userText": "Text 2"

                }, {
                    "userTime": "2021-11-05T08:15:30+03:00",
                    "userTitle": "My Third EventTextText Text Text Text Text Text Text Text Text Text Text Text  Text Text Text Text Text Text Text Text Text Text Text ",
                    "userText": "Text 3"

                }, {
                    "userTime": "2017-11-05T08:15:31+03:00",
                    "userTitle": "My Fourth Event",
                    "userText": "Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text "

                }
                ]
            }));
            //noinspection JSDuplicatedDeclaration
            var eventStoragePull = JSON.parse($window.localStorage.getItem("eventSave"));
            eventStoragePull.events.sort(dateComparator);
            $scope.countTotal = eventStoragePull.events.length;

        } else {
            console.log("wow else");
            //noinspection JSDuplicatedDeclaration
            var eventStoragePull = JSON.parse($window.localStorage.getItem("eventSave"));
            eventStoragePull.events.sort(dateComparator);
            $scope.countTotal = eventStoragePull.events.length;

        }

        if (eventStoragePull.events.length >= 1)
            $scope.userTitle1 = eventStoragePull.events[0].userTitle + "\n" + eventStoragePull.events[0].userTime + "\n" + eventStoragePull.events[0].userText;
        if (eventStoragePull.events.length >= 2)
            $scope.userTitle2 = eventStoragePull.events[1].userTitle + "\n" + eventStoragePull.events[1].userTime + "\n" + eventStoragePull.events[1].userText;
        if (eventStoragePull.events.length >= 3)
            $scope.userTitle3 = eventStoragePull.events[2].userTitle + "\n" + eventStoragePull.events[2].userTime + "\n" + eventStoragePull.events[2].userText;
        if (eventStoragePull.events.length >= 4)
            $scope.userTitle4 = eventStoragePull.events[3].userTitle + "\n" + eventStoragePull.events[3].userTime + "\n" + eventStoragePull.events[3].userText;


        $scope.saveEvent = function () {

            eventStoragePull["events"].push({ // JSON ALL THE WAY
                "userTime": $scope.userTime,
                "userTitle": $scope.userTitle,
                "userText": $scope.userText

            });
            $window.alert(eventStoragePull.stringify);

            eventStoragePull.events.sort(dateComparator);

            $window.localStorage.setItem("eventSave", JSON.stringify(eventStoragePull));
            $scope.countTotal++;

            $scope.userTitle1 = eventStoragePull.events[0];
            $scope.userTitle2 = eventStoragePull.events[1];
            $scope.userTitle3 = eventStoragePull.events[2];
            $scope.userTitle4 = eventStoragePull.events[3];

            location.reload();


        };


        $scope.nextEvent = function () {
            eventCycle++;
            if (eventCycle >= $scope.countTotal)
                eventCycle = $scope.countTotal - 1;
            $scope.userTitle4 = eventStoragePull.events[eventCycle].userTitle + "\n" + eventStoragePull.events[eventCycle].userTime + "\n" + eventStoragePull.events[eventCycle].userText;
            $scope.cycle = eventCycle + 1;
        };

        $scope.prevEvent = function () {
            eventCycle--;
            if (eventCycle < 0)
                eventCycle = 0;
            $scope.userTitle4 = eventStoragePull.events[eventCycle];
            $scope.cycle = eventCycle;
        };

        $scope.removeEvent = function () {
            eventStoragePull.events.splice(eventCycle, 1);

            eventStoragePull.events.sort(dateComparator);
            $scope.userTitle1 = eventStoragePull.events[0];
            $scope.userTitle2 = eventStoragePull.events[1];
            $scope.userTitle3 = eventStoragePull.events[2];
            $scope.userTitle4 = eventStoragePull.events[3];
            $window.localStorage.setItem("eventSave", JSON.stringify(eventStoragePull));
            $scope.countTotal--;
            location.reload();
        };

        $scope.editEvent = function () {
            // prompt user 3 times to edit each field ,
            // probably need to refactor code and separate into 3 variables: time/text/
            //$window.prompt("prompt text",$scope.userTitle4);
            console.log("EVENT EDIT NOT IMPLEMENTED YET");

        };

        $scope.clearAll = function () {
            var r = $window.confirm("Are you sure? This will wipe every event you have saved!");
            if (r == true) {
                $window.localStorage.clear();
                $scope.countTotal = 0;
                $window.alert("All events have been cleared!");
                location.reload();
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