'use strict';

function GmailService ($q, AuthService) {

    var Service = {};
    var nextPageToken = undefined;;

    function getMailsList(pageToken) {
            var deferred = $q.defer();

            if(AuthService.isAuthenticated()){
                
                gapi.client.load('gmail', 'v1', function () {
                        var request;
                        if (pageToken) {
                            request = gapi.client.gmail.users.messages.list({
                                'userId': 'me',
                                'labelIds': 'INBOX',
                                'maxResults': 10,
                                'pageToken': pageToken
                            });
                        } else {
                            request = gapi.client.gmail.users.messages.list({
                                'userId': 'me'
                            });
                        }

                        request.execute(function (resp) {
                            deferred.resolve(resp);
                        });
                    },
                    function (fail) {                       
                        deferred.reject(fail);
                    });
            } else {
                deferred.reject('Not authorized');
            }

            return deferred.promise;
        }

        function getMailsMessages(pageToken) {
            var promises = [];
            var request;
            return getMailsList(pageToken).then(function (data) {
                nextPageToken = data.nextPageToken;
                for (var i = 0; i < data.messages.length; i++) {
                    request = gapi.client.gmail.users.messages.get({
                        'userId': 'me',
                        'id': data.messages[i].id
                    });

                    promises.push(request);
                }
                return $q.all(promises);
            });
        }

        Service.getEmails = function () {
            return getMailsMessages(nextPageToken).then(function (data) {
                var emails = [];
                for (var i = 0; i < data.length; i++) {
                    var subject = data[i].result.payload.headers.filter(function (item) {
                        return item.name === "Subject";
                    });
                    var date = data[i].result.payload.headers.filter(function (item) {
                        return item.name === "Date";
                    });
                    emails.push({
                        snippet: data[i].result.snippet,
                        subject: subject[0] ? subject[0].value : "Empty",
                        date: date[0] ? date[0].value : "Empty",
                        id: data[i].result.id
                    });
                }

                return emails;
            });
        };
    
    return Service;
};


angular.module('services').service('GmailService', ['$q', 'AuthService', GmailService]);