'use strict';
angular.module('HueHub', ['SignalR'])
app.factory('HueHub', ['$rootScope', 'Hub', 'authService',
    function ($rootScope, Hub, authService) {

        var HueHub = this;
        HueHub.connected = 0;

        //declaring the hub connection
        var hub = new Hub('HueHub', {
            rootPath: globals.signalrUrl,

            //client side methods
            listeners: {
                'newConnection': function (count) {
                    HueHub.connected = count;
                    $rootScope.$apply();
                },
                'removeConnection': function (count) {
                    HueHub.connected = count;
                    $rootScope.$apply();
                }
            },

            //server side methods
            //methods: ['lock', 'unlock'],

            //query params sent on initial connection
            //queryParams: {
            //    'token': authService.authorization.token
            //},

            //handle connection error
            errorHandler: function (error) {
                console.error(error);
            },
        });

        var edit = function (employee) {
            hub.lock(employee.Id); //Calling a server method
        };
        var done = function (employee) {
            hub.unlock(employee.Id); //Calling a server method
        }

        //HueHub.connections = { count: 0 };
        return HueHub;
}]);