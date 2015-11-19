futugram.controller('mainCtrl', ['$scope', '$http','storage', 'current_user', function($scope, $http, storage, current_user){

  $scope.current_user = storage.current_user;
  console.log("In main ctrl current user is", current_user);
  $scope.geo = storage.geo;
  
  $scope.getPlaces = storage.getGeoData;

  $scope.searchForm = {};
  $scope.searchForm.place = storage.search.place;
  $scope.searchForm.date = storage.search.date;

  $scope.search = storage.search;

  $scope.featured = storage.featured;

  $scope.weather = storage.weather;
  

  $scope.showForecast = function(){
    //New search query
    storage.search.place = $scope.searchForm.place;
    storage.search.date = $scope.searchForm.date;
    storage.featured.center.lng = $scope.searchForm.place.location.lng;
    storage.featured.center.lat = $scope.searchForm.place.location.lat;
    $scope.featured.map.panTo($scope.featured.center);
    storage.showForecast($scope.searchForm.date, $scope.searchForm.place);
  };
  
  // Building map
  $scope.map = L.map('map',{
    center: [48.858093, 2.34],
    zoom: 11,
    scrollWheelZoom: false
  });

 
  storage.featured.map = $scope.map;
  
  L.Icon.Default.imagePath = 'images';

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.light',
      accessToken: 'pk.eyJ1IjoiYXl2YSIsImEiOiJjaWY0OXE0NWkzNXc1c2ttMms0dzlkdHI0In0.-KmRnZgS76kFVEcBCNJG6Q'
  }).addTo($scope.map);

  
  
  storage.featured.markers = new L.LayerGroup().addTo($scope.map);

  //Searching for photos by click on map
  $scope.map.on('click', function(e) {
    if ($scope.current_user.data){
          //Taking coords from map
          lng = Number(e.latlng.lng).toFixed(6);
          lat = Number(e.latlng.lat).toFixed(6);
          storage.featured.center = {
            lng: lng,
            lat: lat
          };
          storage.search.place.location = storage.featured.center;
          $scope.featured.map.panTo($scope.featured.center);
          //Grab a name of clicked location
          storage.getGeoName(storage.featured.center);
          //Grabbing places for choosen location
          console.log("Looking for picks by click");
          storage.get_future_city($scope.date,
                                  { name: storage.search.place.name,
                                    location: {lng: lng,
                                                       lat: lat
                                                      }
                                  }
                                );
        }
  });



  $scope.date = new Date(Date.now());
  //Show data for Paris
  storage.get_featured_city($scope.date,{name: "Paris",
                                      location: {lng: 2.344694,
                                                 lat: 48.858093
                                                }
                                      }
                          );
}]);