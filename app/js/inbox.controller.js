function InboxCtrl(){
    var vm = this;
    vm.test = 'some word';
}

angular.module('InboxApp')
.controller('InboxCtrl',[InboxCtrl])
