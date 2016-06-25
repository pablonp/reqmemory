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
      .when('/templates', {
        templateUrl: 'app/templates/templates.html',
        controller: 'TemplatesController',
        controllerAs: 'template'
      })
      .when('/pics', {
        templateUrl: 'app/pics/pics.html',
        controller: 'PicsController',
        controllerAs: 'pics'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }

})();
