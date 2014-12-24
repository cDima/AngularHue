angular.module('todoManager', ['ngProgress'])
    .controller('todoManagerCtrl', ['$scope', '$http', 'ngProgress', function ($scope, $http, ngProgress) {

        $scope.getList = function ()
        {
            ngProgress.start();
            $http.get('/api/WS_Todo/GetUserTodoItems')
                .success(function (data, status, headers, config) {
                    ngProgress.complete();
                    $scope.todoList = data;
                })
                .error(function (data, status, headers, config) {
                    ngProgress.complete();
                });
        }

        $scope.postItem = function()
        {
            item =
                {
                    task : $scope.newTaskText
                };

            if ($scope.newTaskText != '') {
                ngProgress.start();
                $http.post('/api/WS_Todo/PostTodoItem', item)
                    .success(function (data, status, headers, config) {
                        ngProgress.complete();
                        $scope.newTaskText = '';
                        $scope.getList();
                    })
                    .error(function (data, status, headers, config) {
                        ngProgress.complete();
                    });
            }
        }

        $scope.complete = function(index)
        {
            ngProgress.start();
            $http.post('/api/WS_Todo/CompleteTodoItem/' + $scope.todoList[index].id)
                .success(function (data, status, headers, config) {
                    ngProgress.complete();
                    $scope.getList();
                })
                .error(function (data, status, headers, config) {
                    ngProgress.complete();
                });
        }

        $scope.delete = function(index)
        {
            ngProgress.start();
            $http.post('/api/WS_Todo/DeleteTodoItem/' + $scope.todoList[index].id)
                .success(function (data, status, headers, config) {
                    ngProgress.complete();
                    $scope.getList();
                })
                .error(function (data, status, headers, config) {
                    ngProgress.complete();
                });
        }

        //Get the current user's list when the page loads.
        $scope.getList();
    }]);