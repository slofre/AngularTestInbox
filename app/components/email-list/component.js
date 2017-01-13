'use strict';

function EmailListController($scope, GmailService) {
    var self = this;
    self.scope = $scope;

    self.emails = setTimeout(
        function(){
            GmailService.getEmails().then(function(data){
                self.emails = data;
            });
        },2000);
}

angular.module('emailList').component(
    'emailList',
    {      
        css: '../../css/email-list.css',  
        templateUrl: 'components/email-list/template.html',
        controller: ['$scope','GmailService',EmailListController]
    }
);