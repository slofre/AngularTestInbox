'use strict';

function DashboardToolbarController($scope,AuthService) {
    var self = this;
    self.scope = $scope;
    self.isSignedIn = AuthService.isAuthenticated();   
   
    var init = function(){
      var onSuccess =  function (googleUser) {
         self.scope.$apply(function () {
            self.isSignedIn = true;
        });       
      }
      var onFailure = function (error) {
        console.log(error);
      }

      AuthService.renderButton('my-signin2',onSuccess, onFailure);
    }    

    init();  

    self.signOut = function(){
     var onSuccess =  function (googleUser) {        
         self.scope.$apply(function () {
            self.isSignedIn = false;
        });  
      }
      var onFailure = function (error) {
        console.log(error);
      }

      AuthService.signOut(onSuccess,onFailure);     
    }   
};

angular.module('dashboardToolbar').component(
    'dashboardToolbar',
    {     
        css: '../../css/main.css',  
        templateUrl: 'components/dashboard-toolbar/template.html',
        controller: ['$scope','AuthService', DashboardToolbarController]
    }
);