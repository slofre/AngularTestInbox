'use strict';

angular.
module('inboxApp').
config([
    '$locationProvider',
    '$routeProvider',
    function ($locationProvider, $routeProvider) {
        
        $locationProvider.hashPrefix('!');
        
        $routeProvider.
        when('/home', {
          template: '<inbox></inbox>'
        }).
        otherwise('/home');
    }
]);
