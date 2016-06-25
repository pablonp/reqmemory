(function() {
  'use strict';

  angular
    .module('hack')
    .controller('PicsController', PicsController);

  /** @ngInject */
  function PicsController($location, $log, $timeout, Dropbox) {
    var vm = this;

    vm.pictureList = [];

    vm.dirList = [];
    
    if (!Dropbox.isAuthenticated()) {
      $location.path('/login');
    }



    Dropbox.readdir('/').then(function(data) {
      $log.info('response', data);
      _.forEach(data, function(value) {
        var tmpName = value.split('.');
        vm.dirList.push({
          path: value,
          type: (tmpName.length > 1 ? 'file' : 'folder')
        });
      });
    });
  }
})();
