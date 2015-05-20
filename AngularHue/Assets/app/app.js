/*
 * Dmitry Sadakov sadakov.com 
 * All Rights Reserved
 */ 

var app = angular.module('app', [
    'ngRoute',
    'ngCookies',
    'ngMaterial',
    'home', 
    'signIn',
    'register',
    'ngProgress',
    'LocalStorageModule',
    'todoManager',
    'HueHub',
    'HueWeb' 
])
 .config(function ($mdThemingProvider) {
     $mdThemingProvider.theme('default')
     .primaryPalette('blue')
     //.accentPalette('indigo');
     ;


     //$mdThemingProvider.definePalette('amazingPaletteName', {
     //    '50': 'ffebee',
     //    '100': 'ffcdd2',
     //    '200': 'ef9a9a',
     //    '300': 'e57373',
     //    '400': 'ef5350',
     //    '500': 'f44336',
     //    '600': 'e53935',
     //    '700': 'd32f2f',
     //    '800': 'c62828',
     //    '900': 'b71c1c',
     //    'A100': 'ff8a80',
     //    'A200': 'ff5252',
     //    'A400': 'ff1744',
     //    'A700': 'd50000',
     //    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
     //    // on this palette should be dark or light
     //    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     //     '200', '300', '400', 'A100'],
     //    'contrastLightColors': undefined    // could also specify this if default was 'dark'
     //});

     //$mdThemingProvider.theme('default')
     //  .primaryPalette('amazingPaletteName');

     //// Extend the red theme with a few different colors
     //var neonRedMap = $mdThemingProvider.extendPalette('red', {
     //    '500': 'ff0000'
     //});
     //// Register the new color palette map with the name <code>neonRed</code>
     //$mdThemingProvider.definePalette('neonRed', neonRedMap);
     //// Use that theme for the primary intentions
     //$mdThemingProvider.theme('default')
     //  .primaryPalette('neonRed');

 });


var serviceBase = 'http://localhost:34182/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'self'
});

app.config(['$provide', '$routeProvider', '$httpProvider',
    //'$mdThemingProvider',
    function ($provide, $routeProvider, $httpProvider//, $mdThemingProvider
        ) {
    
        //$provide.decorator('$uiViewScroll', function ($delegate) {
        //    return function (uiViewElement) {
        //        // var top = uiViewElement.getBoundingClientRect().top;
        //         //window.scrollTo(0, (top - 30));
        //        // Or some other custom behaviour...
        //        // no action
        //    };
        //});

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
        templateUrl: 'App/Home',
        controller: 'homeCtrl'
    });
    $routeProvider.when('/hueweb', {
        templateUrl: 'App/Home',
        controller: 'homeCtrl'
    });
    $routeProvider.when('/register', {
        templateUrl: 'App/Register',
        controller: 'registerCtrl'
    });
    $routeProvider.when('/signin/:message?', {
        templateUrl: 'App/SignIn',
        controller: 'signInCtrl'
    });
    $routeProvider.when('/todomanager', {
        templateUrl: 'App/TodoManager',
        controller: 'todoManagerCtrl'
    });
    
    $routeProvider.otherwise({
        redirectTo: '/home'
    });

        // default theme
    //$mdThemingProvider.theme('lightblueTheme');
        //$mdThemingProvider.alwaysWatchTheme(true);
}]);

app.run(['$http', '$cookies', '$cookieStore', function ($http, $cookies, $cookieStore) {
    //If a token exists in the cookie, load it after the app is loaded, so that the application can maintain the authenticated state.
    if ($cookieStore.get('_Token') !== null) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $cookieStore.get('_Token');
    }
    $http.defaults.headers.common.RefreshToken = $cookieStore.get('_RefreshToken');
}]);






//GLOBAL FUNCTIONS - pretty much a root/global controller.
//Get username on each page
//Get updated token on page change.
//Logout available on each page.
app.run(['$rootScope', '$http', '$cookies', '$cookieStore', 'ngProgress', 'authService',
function ($rootScope, $http, $cookies, $cookieStore, ngProgress, authService) {

    $rootScope.logout = function () {
        
        ngProgress.start();
        $http.post('/api/Account/Logout')
            .success(function (data, status, headers, config) {
                ngProgress.complete();
                authService.logOut();
                $http.defaults.headers.common.Authorization = null;
                $http.defaults.headers.common.RefreshToken = null;
                $cookieStore.remove('_Token');
                $cookieStore.remove('_RefreshToken');
                $rootScope.username = '';
                $rootScope.loggedIn = false;
                //window.location = '#/signin';
            });

    }
    
    $rootScope.login = function () {
    }

    $rootScope.$on('$locationChangeSuccess', function (event) {
        if (false && $http.defaults.headers.common.RefreshToken != null) {
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