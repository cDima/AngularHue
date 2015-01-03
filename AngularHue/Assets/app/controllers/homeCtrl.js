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

                        //$location.path('/associate');

                    }
                    else {
                        //Obtain access token and redirect to orders
                        var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                        authService.obtainAccessToken(externalData).then(function (response) {

                            //$location.path('/orders');

                        },
                     function (err) {
                         $scope.message = err.error_description;
                     });
                    }

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