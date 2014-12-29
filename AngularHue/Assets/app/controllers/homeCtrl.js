angular.module('home', ['ngProgress', 'ngMaterial'])
    .controller('homeCtrl', ['$scope', '$http', 'ngProgress', '$timeout', '$mdSidenav', '$log',
        function ($scope, $http, ngProgress, $timeout, $mdSidenav, $log) {
        ngProgress.start();
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