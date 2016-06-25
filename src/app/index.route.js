(function() {
  'use strict';

  angular
    .module('hack')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/oauth', {
        templateUrl: 'app/oauth/oauth.html',
        controller: 'AuthController',
        controllerAs: 'auth'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
