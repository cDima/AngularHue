angular.module('register', ['ngProgress'])
    .controller('registerCtrl', ['$scope', '$http', 'ngProgress', function ($scope, $http, ngProgress) {
        ngProgress.start();

        $scope.register = function()
        {
            var params = {
                Email: $scope.username,
                Password: $scope.password1,
                ConfirmPassword: $scope.password2
            };
            ngProgress.start();
            $http.post('/api/Account/Register', params)
            .success(function (data, status, headers, config) {
                ngProgress.complete();
                $scope.successMessage = "Registration Complete.  Please check your email for account activation instructions.";
                $scope.showErrorMessage = false;
                $scope.showSuccessMessage = true;
            })
            .error(function (data, status, headers, config) {
                ngProgress.complete();
                if (angular.isArray(data))
                    $scope.errorMessages = data;
                else
                    $scope.errorMessages = new Array(data.replace(/["']{1}/gi, ""));

                $scope.showSuccessMessage = false;
                $scope.showErrorMessage = true;
            });
        }

        $scope.showAlert = false;
        $scope.showSuccess = false;

        ngProgress.complete();
    }]);