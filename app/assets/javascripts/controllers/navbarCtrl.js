futugram.controller('navbarCtrl', ['$scope', '$http','storage', 'current_user', 'Restangular', function($scope, $http, storage, current_user, Restangular){
  
  $scope.current_user = storage.current_user;
  $scope.ctrldata = "Hello ctrl";
  // $scope.authorized = Authorized;

  $scope.Logout = function(){
    // Implement logout
    Restangular.all('sessions').customGET('logout').then(function(res){
      console.log("You successfully logged out", res.message);
      
      storage.current_user.data = undefined;
    }, function(error){
      console.log("Logout error", error.message);
    });
  };
}]);