(function() {
  'use strict';

  angular
    .module('hack')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $timeout) {
    var vm = this;

    vm.login = function() {
        console.log('HEEEEY we are here :D');
        dropboxSrv.login();
    };

    vm.getinfo = function () {
      /*dropboxSrv.client.getAccountInfo(function(error, accountInfo) {
        if (error) {
          return handleError(error);  // Something went wrong.
        }

        alert("Hello, " + accountInfo.name + "!");
      });*/
    };

    //vm.loggedin = dropboxSrv.client.isAuthenticated();

    console.log(vm.loggedin);

    function handleError (err) {
      $log.info(err);
    }


    function doSomethingCool(data) {
      $log.info(data);
    }
  }
})();
