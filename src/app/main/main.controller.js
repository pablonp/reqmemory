(function() {
  'use strict';

  angular
    .module('hack')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $location, $timeout, Dropbox) {
    var vm = this;

    vm.login = function () {
      vm.accountInfo = Dropbox.authenticate().then(function(status) {
        $log.info('status', status);
        $location.path('/templates');
      });
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
