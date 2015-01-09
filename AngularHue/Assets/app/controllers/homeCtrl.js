angular.module('home', ['ngProgress', 'HueHub'])
    .controller('homeCtrl', ['$scope', '$location', '$http', 'ngProgress', '$timeout', '$mdSidenav', '$log', 'ngAuthSettings', 'authService', 'HueHub',
    function ($scope, $location, $http, ngProgress, $timeout, $mdSidenav, $log, ngAuthSettings, authService, HueHub) {

        ngProgress.start();

        //HueWeb.init();

        $scope.data = {
            selectedIndex: 0,
            secondLocked: false,
            secondLabel: "Item Two"
        };

        authService.fillAuthData();
        $scope.auth = authService.authentication;

        $scope.alert = function () {
            alert("WOW");
        }
        ngProgress.complete();


        $scope.toggleLeft = function () {
            $mdSidenav('left').toggle()
                .then(function () {
                    $log.debug("toggle left is done");
                });
        };
        $scope.toggleRight = function () {
            var tab = $mdSidenav('right');
            var r = tab.toggle();
            r.then(function () {
                $log.debug("toggle RIGHT is done");
            });
        };

        // hue hub
        $scope.hub = HueHub;
    }])
    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('left').close()
                              .then(function () {
                                  $log.debug("close LEFT is done");
                              });
        };
    })
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('right').close()
                                .then(function () {
                                    $log.debug("close RIGHT is done");
                                });
        };
    });