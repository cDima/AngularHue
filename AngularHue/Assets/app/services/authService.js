'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        name: "",
        email: "",
        image: "",
        facebooklink: "",
        googlelink: "",
        useRefreshTokens: false
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        name: "",
        email: "",
        image: "",
        facebooklink: "",
        googlelink: "",
        externalAccessToken: ""
    };

    var _assignSocialData = function (input, obj) {
        obj.name = input.name;
        obj.email = input.email;
        obj.image = input.image;
        obj.facebooklink = input.facebooklink;
        obj.googlelink = input.googlelink;
    }

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        if (loginData.useRefreshTokens) {
            data = data + "&client_id=" + ngAuthSettings.clientId;
        }

        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            if (loginData.useRefreshTokens) {
                var obj = { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true };
                _assignSocialData(loginData, obj);
                localStorageService.set('authorizationData', obj);
            }
            else {
                var obj = { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false };
                _assignSocialData(loginData, obj);
                localStorageService.set('authorizationData', obj);
            }
            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _assignSocialData(loginData, _authentication);
            _authentication.useRefreshTokens = loginData.useRefreshTokens;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";

        _authentication.name = "";
        _authentication.email = "";
        _authentication.image = "";
        _authentication.facebooklink = "";
        _authentication.googlelink = "";

        _authentication.useRefreshTokens = false;

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _assignSocialData(authData, _authentication);
            _authentication.useRefreshTokens = authData.useRefreshTokens;
        }

    };

    var _refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get('authorizationData');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    var obj = {
                        token: response.access_token,
                        userName: response.userName,
                        refreshToken: response.refresh_token, useRefreshTokens: true
                    };
                    _assignSocialData(response, obj);
                    localStorageService.set('authorizationData', obj);

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            }
        }

        return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            var obj = { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false };
            _assignSocialData(response, obj);

            localStorageService.set('authorizationData', obj);

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;
            _assignSocialData(response, _authentication);

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {


            var obj = { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false };
            _assignSocialData(response, obj);
            localStorageService.set('authorizationData', obj);

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _assignSocialData(response, _authentication);
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    return authServiceFactory;
}]);