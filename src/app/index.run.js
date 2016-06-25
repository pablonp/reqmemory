(function() {
  'use strict';

  angular
    .module('hack')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    var client = new Dropbox.Client({ key: "your-key-here" });
    $log.debug('runBlock end');
  }

})();
