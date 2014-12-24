angular.module('home', ['ngProgress'])
    .controller('homeCtrl',['$scope','$http', 'ngProgress', function ($scope, $http, ngProgress) {
        $scope.alert = function () {
            alert("WOW");
        }
    }]);