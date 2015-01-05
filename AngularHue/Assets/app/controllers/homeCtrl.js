angular.module('home', ['ngProgress'])
    .controller('homeCtrl', ['$scope', '$location', '$http', 'ngProgress', '$timeout', '$mdSidenav', '$log', 'ngAuthSettings', 'authService',
        function ($scope, $location, $http, ngProgress, $timeout, $mdSidenav, $log, ngAuthSettings, authService) {

            ngProgress.start();

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