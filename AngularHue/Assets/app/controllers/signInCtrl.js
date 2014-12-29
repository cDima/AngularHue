angular.module('signIn', ['ngCookies', 'ngProgress'])
    .controller('signInCtrl',
    ['$scope', '$rootScope', '$http', '$cookies', '$cookieStore', '$location', '$routeParams', 'ngProgress',
        function ($scope, $rootScope, $http, $cookies, $cookieStore, $location, $routeParams, ngProgress) {
            ngProgress.start();

            $scope.message = $routeParams.message;
            
            $scope.signIn = function () {
                $scope.showMessage = false;
                var params = "grant_type=password&username=" + $scope.username + "&password=" + $scope.password;
                ngProgress.start();
                $http({
                    url: '/Token',
                    method: "POST",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: params
                })
                .success(function (data, status, headers, config) {
                    ngProgress.complete();
                    $http.defaults.headers.common.Authorization = "Bearer " + data.access_token;
                    $http.defaults.headers.common.RefreshToken = data.refresh_token;

                    $cookieStore.put('_Token', data.access_token);
                    window.location = '#/todomanager';
                })
                .error(function (data, status, headers, config) {
                    ngProgress.complete();
                    $scope.message = data.error_description.replace(/["']{1}/gi, "");
                    $scope.showMessage = true;
                });
            }

            ngProgress.complete();
        }]);