var app = angular.module('app', [
    'ngRoute',
    'ngCookies',
    'ngMaterial',
    'home',
    'signIn',
    'register',
    'ngProgress',
    'LocalStorageModule',
    'todoManager'
]);


var serviceBase = 'http://localhost:33651/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'self'
});

        

app.config(['$provide', '$routeProvider', '$httpProvider', function ($provide, $routeProvider, $httpProvider) {
    
    // Ignore Template Request errors if a requested page was not found or unauthorized.  
    // The GET operation could still show up in the browser debugger, but it shouldn't show a $compile:tpload error.

    //$provide.decorator('$templateRequest', ['$delegate', function ($delegate) {
    //    var mySilentProvider = function (tpl, ignoreRequestError) {

    //        return $delegate(tpl, ignoreRequestError);
    //        //return $delegate(tpl, true);
    //    }
    //    return mySilentProvider;
    //}]);

    // Add an interceptor for AJAX errors
    $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
        return {            
            'responseError': function (response) {
                if (response.status === 401)
                    $location.url('/signin');
                return $q.reject(response);
            }
        };
    }]);

    // Routes
    $routeProvider.when('/home', {
        templateUrl: 'hue/App/Home',
        controller: 'homeCtrl'
    });
    $routeProvider.when('/register', {
        templateUrl: 'hue/App/Register',
        controller: 'registerCtrl'
    });
    $routeProvider.when('/signin/:message?', {
        templateUrl: 'hue/App/SignIn',
        controller: 'signInCtrl'
    });
    $routeProvider.when('/todomanager', {
        templateUrl: 'hue/App/TodoManager',
        controller: 'todoManagerCtrl'
    });
    
    $routeProvider.otherwise({
        redirectTo: '/home'
    });    
}]);

app.run(['$http', '$cookies', '$cookieStore', function ($http, $cookies, $cookieStore) {
    //If a token exists in the cookie, load it after the app is loaded, so that the application can maintain the authenticated state.
    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookieStore.get('_Token');
    $http.defaults.headers.common.RefreshToken = $cookieStore.get('_RefreshToken');
}]);






//GLOBAL FUNCTIONS - pretty much a root/global controller.
//Get username on each page
//Get updated token on page change.
//Logout available on each page.
app.run(['$rootScope', '$http', '$cookies', '$cookieStore', 'ngProgress',
    function ($rootScope, $http, $cookies, $cookieStore, ngProgress) {

    $rootScope.logout = function () {
        
        ngProgress.start();
        $http.post('/api/Account/Logout')
            .success(function (data, status, headers, config) {
                ngProgress.complete();
                $http.defaults.headers.common.Authorization = null;
                $http.defaults.headers.common.RefreshToken = null;
                $cookieStore.remove('_Token');
                $cookieStore.remove('_RefreshToken');
                $rootScope.username = '';
                $rootScope.loggedIn = false;
                window.location = '#/signin';
            });

    }

    $rootScope.$on('$locationChangeSuccess', function (event) {
        if ($http.defaults.headers.common.RefreshToken != null) {
            var params = "grant_type=refresh_token&refresh_token=" + $http.defaults.headers.common.RefreshToken;
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
                $cookieStore.put('_RefreshToken', data.refresh_token);

                ngProgress.start();
                $http.get('/api/WS_Account/GetCurrentUserName')
                    .success(function (data, status, headers, config) {
                        ngProgress.complete();
                        if (data != "null") {
                            $rootScope.username = data.replace(/["']{1}/gi, "");//Remove any quotes from the username before pushing it out.
                            $rootScope.loggedIn = true;
                        }
                        else
                            $rootScope.loggedIn = false;
                    })
                    .error(function (data, status, headers, config) {
                        ngProgress.complete();
                    });


            })
            .error(function (data, status, headers, config) {
                ngProgress.complete();
                $rootScope.loggedIn = false;
            });
        }
    });
}]);

app.controller('home1Ctrl', function ($scope) {
    $scope.data = {
        selectedIndex: 0,
        secondLocked: true,
        secondLabel: "Item Two"
    };
    $scope.next = function () {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };
    $scope.previous = function () {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
});