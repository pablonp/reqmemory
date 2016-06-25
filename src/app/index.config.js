(function() {
  'use strict';

  angular
    .module('hack')
    .config(config);

  /** @ngInject */
  function config($logProvider, DropboxProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    DropboxProvider.config('3vc8vd705z7p1gm', 'https://petran.guru/public_html/callback.html');
    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
