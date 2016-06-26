(function () {
  'use strict';

  angular
    .module('hack')
    .controller('PicsController', PicsController);

  /** @ngInject */
  function PicsController($location, $log, $http, $rootScope, $timeout, Dropbox) {
    var vm = this;

    vm.pictureList = [];

    vm.userData = {};

    vm.dirList = [];

    vm.openedDir = [];

    vm.tmpList = [];

    vm.images_stats = {
      total: 0,
      processed: 0,
      selected: 0
    };

    vm.status = {
      loading: true,
      saving: false,
      is_sub_folder: false,
      link: 'http://www.recmemory.org/#/view/?id='
    };

    if (!Dropbox.isAuthenticated()) {
      $location.path('/login');
    }

    $rootScope.$on('shares:new', function () {
      if (vm.images_stats.processed >= vm.images_stats.total) {
        $rootScope.$broadcast('shares:send');
        $log.info('EVERYTHING READY TO SEND', vm.tmpList);

        $http.post('http://api.mkt.builders/recmemory/save', {
          images: vm.tmpList
        }).then(function () {
          vm.status.saving = false;
          vm.status.success = true;
          vm.status.link = "http://www.recmemory.org/#/view/?id=XXSDR";
        });

      } else {
        vm.images_stats.processed++;
      }
    });


    Dropbox.userInfo().then(function (data) {
      $log.warn('USER DATA', data);
      vm.userData = data;
    });


    vm.openOrAdd = function (item) {
      if (item.type == 'file') {
        var tmpIndex = alreadyAdded(item.path);
        if (tmpIndex != -1) {
          vm.pictureList[tmpIndex] = {};
          vm.images_stats.selected--;
          item.action = 'add';
        } else {
          vm.images_stats.selected++;
          vm.pictureList.push(item);
          item.action = 'remove';
        }
      } else {
        openDir(item.path);
      }
    };

    vm.goBack = function () {
      vm.status.is_sub_folder = false;
    };

    vm.save = function () {
      vm.status.saving = true;
      vm.tmpList = [];
      _.forEach(vm.pictureList, function (item) {
        if (item.path) {
          vm.tmpList.push(item);
        }
      });

      vm.images_stats.total = vm.tmpList.length;
      vm.images_stats.processed = 1;

      $log.info('data to get link', vm.tmpList);

      _.forEach(vm.tmpList, function (item) {
        Dropbox.share(item.path).then(function (data) {
          item.url = data.url.replace('?dl=0', '?dl=1');
          $rootScope.$broadcast('shares:new');
          $log.info(data);
        });
      });

    };

    function openDir(dir) {
      vm.openedDir = [];
      vm.status.loading = true;
      Dropbox.readdir('/' + dir).then(function (data) {
        _.forEach(data, function (value) {
          var tmpName = value.split('.');
          vm.openedDir.push({
            path: value,
            type: (tmpName.length > 1 ? 'file' : 'folder'),
            action: (alreadyAdded(value) == -1 ? 'add' : 'remove')
          });
        });

        vm.status.loading = false;
        vm.status.is_sub_folder = true;
      });
    }

    function alreadyAdded(dir) {
      return _.findIndex(vm.pictureList, function (o) { return o.path == dir; });
    }


    Dropbox.readdir('/').then(function (data) {
      _.forEach(data, function (value) {
        var tmpName = value.split('.');
        vm.dirList.push({
          path: value,
          type: (tmpName.length > 1 ? 'file' : 'folder'),
          action: (alreadyAdded(value) == -1 ? 'add' : 'remove')
        });
      });

      vm.status.loading = false;
    });
  }
})();
