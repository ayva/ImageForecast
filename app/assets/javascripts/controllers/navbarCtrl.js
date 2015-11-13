futugram.controller('navbarCtrl', ['$scope', '$http','storage', 'current_user', function($scope, $http, storage, current_user){
  $scope.current_user = current_user;
  $scope.ctrldata = "Hello ctrl";
  // $scope.authorized = Authorized;
}]);