futugram.controller('mainCtrl', ['$scope', '$http','storage', function($scope, $http, storage){
  // $scope.title = "Paris now"
  // $scope.featured = storage.featured;
  // storage.get_featured_city();
  
  $scope.geo = storage.geo;
  
  $scope.getPlaces = storage.getGeoData;

  $scope.date = new Date(Date.now()- 60*60*24*364*1000);
  $scope.title = "Paris tomorrow";
  $scope.featured = storage.featured;
  storage.get_future_city($scope.date,{name: "Paris",
                                      location: {lng: 2.294694,
                                                 lat: 48.858093
                                                }
                                      }
                          );

  $scope.showForecast = function(){
    console.log("date is ", $scope.date);
   
    storage.showForecast($scope.searchForm.date - 60*60*24*364*1000, $scope.searchForm.place);
  };



}]);