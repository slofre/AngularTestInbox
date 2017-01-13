'use strict';

function AuthService ($q,localStorageService) {
  
    var Service = {};    
    Service.googleUser = undefined;

    gapi.load('client:auth2', function () {      
        gapi.auth2.init({
                'client_id': '224142087500-heth8sfkjet3tqqmajcscsfalhhivgs0.apps.googleusercontent.com',
                'scope': 'profile email https://www.googleapis.com/auth/gmail.readonly',
                'cookie_policy': 'none'
            });    
        }); 

    Service.renderButton = function (buttonId, onSuccess, onFailure) {        
      gapi.signin2.render(buttonId, {
        'scope': 'profile email',
        'width': 200,
        'height': 40,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': function(googleUser){ 
            localStorageService.set('token', googleUser.getAuthResponse().id_token);
            Service.googleUser = googleUser;
            onSuccess();
            },
        'onfailure': onFailure
      });
    };  

    Service.isSignedIn = function() {
        return gapi.auth2.getAuthInstance().isSignedIn.get();
    }

    Service.isAuthenticated = function () {
        return localStorageService.get('token') ? true : false;
    };

    Service.signOut = function(onSuccess,onFailed) {
        var self = this;
        var success = function(){
            localStorageService.remove('token');
            onSuccess();
        }     
        
        var auth2 =  gapi.auth2.getAuthInstance();

        auth2.signOut().then(success,onFailed);
    };        

    return Service;
};


angular.module('services').service('AuthService', ['$q','localStorageService', AuthService]);