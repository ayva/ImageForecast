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
        resolve: {
          current_user: function($http){
            $http.get('authorized').then(function(response){
              return response.data;
            }, function(error){
              console.log("Resolve current user failed", error) ;
              return false;
            });
          }
        },
        views: {
          '':{
            templateUrl: 'templates/main.html',
            controller: 'mainCtrl'
          },
          'navbar' : {
            templateUrl: 'partials/navbar.html',
            controller: 'navbarCtrl'
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
