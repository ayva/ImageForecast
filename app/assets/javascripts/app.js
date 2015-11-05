var futugram = angular.module('futugram',['restangular', 'ui.router','ui.bootstrap', 'ui.bootstrap.typeahead'])
.config(['RestangularProvider', function(RestangularProvider){

  // RestangularProvider.setBaseUrl('api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
    "content-type":"application/json"
  });
}])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('index',{
        url: '/',
        views: {
          '':{
            templateUrl: 'templates/main.html',
            controller: 'mainCtrl'
          }
        }

      })
      .state('about',{
        url: '/about',
        views: {
          '':{
            templateUrl: 'templates/about.html',
            controller: 'aboutCtrl'
          }
        }
      });

      $urlRouterProvider.otherwise('/');
}])
;
