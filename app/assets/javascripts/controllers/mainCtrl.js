futugram.controller('mainCtrl', ['$scope', 'storage', function($scope, storage){
  
  $scope.featured = storage.featured;
  storage.get_featured_city();
}]);