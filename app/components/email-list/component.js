'use strict';

function EmailListController() {
    var self = this;

    self.emails = [
        {
            icon: 'http://i.imgur.com/1Jvj0bU.jpg',
            title: 'Good morning',
            message: 'Some long description Some long description Some long description Some long description Some long description Some long descriptionSome long descriptionSome long description',
            date: '1288323623006'
        }, {
            icon: 'http://i.imgur.com/1Jvj0bU.jpg',
            title: 'Good morning',
            message: 'Some long description Some long description Some long description Some long description Some long description Some long descriptionSome long descriptionSome long description',
            date: '1288323623006'
        }, {
            icon: 'http://i.imgur.com/1Jvj0bU.jpg',
            title: 'Good morning',
            message: 'Some long description Some long description Some long description Some long description Some long description Some long descriptionSome long descriptionSome long description',
            date: '1288323623006'
        }
      ];
}

angular.module('emailList').component(
    'emailList',
    {      
        css: '../../css/email-list.css',  
        templateUrl: 'components/email-list/template.html',
        controller: [EmailListController]
    }
);