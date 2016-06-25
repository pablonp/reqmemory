(function () {
  'use strict';

  angular
    .module('hack')
    .controller('AuthController', AuthController);

  /** @ngInject */
  function AuthController($location, $log, $timeout, Dropbox) {
    var vm = this;


    vm.login = function () {
      vm.accountInfo = Dropbox.authenticate();
    };

    vm.getInfo = function () {
      vm.accountInfo = Dropbox.accountInfo();
    };

    function doSomethingCool() {
      $log.info('aaaa');
    }

    function handleError(error) {
      $log.info(error);
    }

  }
})();
