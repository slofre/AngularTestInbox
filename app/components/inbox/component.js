'use strict';

function InboxController() {
    var self = this;
}

angular.module('inbox').component(
    'inbox',
    {   
        css: '../../css/inbox.css',   
        templateUrl: 'components/inbox/template.html',
        controller: [InboxController]
    }
);