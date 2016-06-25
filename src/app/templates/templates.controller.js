(function() {
  'use strict';

  angular
    .module('hack')
    .controller('TemplatesController', TemplatesController);

  /** @ngInject */
  function TemplatesController($location, $log, $timeout, Dropbox) {
    var vm = this;

    vm.goPics = function() {
        $location.path('/pics');
    };

  }
})();
