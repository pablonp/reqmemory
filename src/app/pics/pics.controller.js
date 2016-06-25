(function() {
  'use strict';

  angular
    .module('hack')
    .controller('PicsController', PicsController);

  /** @ngInject */
  function PicsController($location, $log, $timeout, Dropbox) {
    var vm = this;

    if (!Dropbox.isAuthenticated()) {
      $location.path('/login');
    }

    Dropbox.readdir('/').then(function(data) {
      vm.dirList = data;
      $log.info('response', data);
    });
  }
})();
