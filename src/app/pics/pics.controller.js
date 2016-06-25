(function() {
  'use strict';

  angular
    .module('hack')
    .controller('PicsController', PicsController);

  /** @ngInject */
  function PicsController($location, $log, $rootScope, $timeout, Dropbox) {
    var vm = this;

    vm.pictureList = [];

    vm.userData = {};

    vm.dirList = [];

    vm.openedDir = [];

    vm.tmpList = [];

    vm.total = 0;

    vm.current = 0;

    vm.subFolder = false;


    if (!Dropbox.isAuthenticated()) {
      $location.path('/login');
    }

    $rootScope.$on('shares:new', function() {
      if (vm.current >= vm.total) {
        $rootScope.$broadcast('shares:send');
        $log.info('EVERYTHING READY TO SEND', vm.tmpList);
      } else {
        vm.current++;
      }
    });


    Dropbox.userInfo().then(function(data) {
      $log.warn('USER DATA', data);
      vm.userData = data;
    });


    vm.openOrAdd = function(item) {
      if (item.type == 'file') {
        var tmpIndex = alreadyAdded(item.path);
        if (tmpIndex != -1) {

          vm.pictureList[tmpIndex] = {};
          item.action = '-';
        } else {
          vm.pictureList.push(item);
          item.action = '+';
        }
      } else {
        openDir(item.path);
      }
    };

    vm.goBack = function() {
      vm.subFolder = false;
    };

    vm.save = function() {
      vm.tmpList = [];
      _.forEach(vm.pictureList, function(item) {
        if (item.path) {
          vm.tmpList.push(item);
        }
      });

      vm.total = vm.tmpList.length;
      vm.current = 1;
      
      $log.info('data to get link', vm.tmpList);

      _.forEach(vm.tmpList, function(item) {
        Dropbox.share(item.path).then(function(data) {
          item.url = data.url.replace('?dl=0', '?dl=1');
          $rootScope.$broadcast('shares:new');
          $log.info(data);
        });
      });

    };

    function openDir(dir) {
      vm.openedDir = [];
      Dropbox.readdir('/' + dir).then(function(data) {
        _.forEach(data, function(value) {
          var tmpName = value.split('.');
          vm.openedDir.push({
            path: value,
            type: (tmpName.length > 1 ? 'file' : 'folder'),
            action: (alreadyAdded(value) == -1 ? '+' : '-')
          });
        });

        vm.subFolder = true;
      });
    }

    function alreadyAdded(dir) {
      return _.findIndex(vm.pictureList, function(o) { return o.path == dir; });
    }


    Dropbox.readdir('/').then(function(data) {
      _.forEach(data, function(value) {
        var tmpName = value.split('.');
        vm.dirList.push({
          path: value,
          type: (tmpName.length > 1 ? 'file' : 'folder'),
          action: (alreadyAdded(value) == -1 ? '+' : '-')
        });
      });
    });
  }
})();
