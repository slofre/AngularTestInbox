'use strict';

function InboxController($scope,AuthService) {
    var self = this;    
}

angular.module('inbox').component(
    'inbox',
    {   
        css: '../../css/inbox.css',   
        templateUrl: 'components/inbox/template.html',
        controller: ['$scope','AuthService', InboxController]
    }
);