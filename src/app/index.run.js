(function() {
  'use strict';

  angular
    .module('hack')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
