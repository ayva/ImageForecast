futugram.controller('mainCtrl', ['$scope', '$http','storage', function($scope, $http, storage){
  // $scope.title = "Paris now"
  // $scope.featured = storage.featured;
  // storage.get_featured_city();
  
  $scope.geo = storage.geo;
  
  $scope.getPlaces = storage.getGeoData;

  $scope.date = new Date(Date.now()- 60*60*24*364*1000);
  $scope.search = storage.search;
  $scope.featured = storage.featured;

  

  $scope.showForecast = function(){
    //New search query
    storage.search.place = $scope.searchForm.place.name;
    storage.search.date = $scope.searchForm.date;

    //New map enter
    
    storage.featured.center.lng = $scope.searchForm.place.location.lng;
    storage.featured.center.lat = $scope.searchForm.place.location.lat;
    $scope.featured.map.panTo($scope.featured.center);
    storage.showForecast($scope.searchForm.date - 60*60*24*364*1000, $scope.searchForm.place);
  };
  
  // Building map
  $scope.map = L.map('map').setView([48.858093, 2.34], 11);
   
  storage.featured.map = $scope.map;

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.light',
      accessToken: 'pk.eyJ1IjoiYXl2YSIsImEiOiJjaWY0OXE0NWkzNXc1c2ttMms0dzlkdHI0In0.-KmRnZgS76kFVEcBCNJG6Q'
  }).addTo($scope.map);

  // $scope.circles = new L.LayerGroup().addTo($scope.map);
  // var cicle = L.circle([48.858093, 2.34], 5000, {
  //   color: 'red',
  //   fillColor: '#f03',
  //   fillOpacity: 0.5
  // }).addTo($scope.map);
  // storage.featured.cicles = $scope.cicles;

  //Build markers
  // var marker = L.marker([48.858093, 2.34]).addTo($scope.map);
  
  storage.featured.markers = new L.LayerGroup().addTo($scope.map);

  //Searching for photos by click on map
  $scope.map.on('click', function(e) {
    //Taking coords from map
    lng = Number(e.latlng.lng).toFixed(6);
    lat = Number(e.latlng.lat).toFixed(6);
    storage.featured.center = {
      lng: lng,
      lat: lat
    };

    $scope.featured.map.panTo($scope.featured.center);

    //Grabbing places for choosen location
    storage.get_future_city($scope.date,
                            { name: "Click on map",
                              location: {lng: lng,
                                                 lat: lat
                                                }
                            }
                          );
  });



  //Show data for Paris
  storage.get_future_city($scope.date,{name: "Paris",
                                      location: {lng: 2.344694,
                                                 lat: 48.858093
                                                }
                                      }
                          );
}]);