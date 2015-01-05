angular.module('signIn', ['ngCookies', 'ngProgress'])
    .controller('signInCtrl',
    ['$scope', '$rootScope', '$http', '$cookies', '$cookieStore', '$location', '$routeParams', 'ngProgress', 'ngAuthSettings', 'authService',
function ($scope, $rootScope, $http, $cookies, $cookieStore, $location, $routeParams, ngProgress, ngAuthSettings, authService) {
            ngProgress.start();

            $scope.message = $routeParams.message;
        
            if ($scope.auth === undefined) {
                $scope.auth = authService.authentication;
            }
            
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


            $scope.authExternalProvider = function (provider) {

                var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

                var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                            + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                            + "&redirect_uri=" + redirectUri;
                window.$windowScope = $scope;

                var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
            };


            $scope.authCompletedCB = function (fragment) {

                $scope.$apply(function () {

                    if (fragment.haslocalaccount == 'False') {

                        // user logged in via fb or g+, now he can save
                        //authService.logOut();

                        authService.externalAuthData = {
                            provider: fragment.provider,
                            userName: fragment.external_user_name,
                            externalAccessToken: fragment.external_access_token
                        };

                        $location.path('/home');

                    }
                    else {
                        //Obtain access token and redirect to orders
                        var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                        authService.obtainAccessToken(externalData).then(function (response) {
                            
                            //$location.path('/home');
                            //$scope.$apply();
                            //$scope.auth = authService.authentication;
                        },
                     function (err) {
                         $scope.message = err.error_description;
                     });
                    }

                });
            };

            ngProgress.complete();
        }]);