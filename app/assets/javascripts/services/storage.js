futugram.service('storage',['$http','Restangular', function($http,Restangular){
  var obj = {};

  obj.featured = {};
  obj.featured.center = {
    lng: 2.344694,
    lat: 48.858093
    };

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  obj.search = { place: "Paris",
                 date: addDays(new Date(), 1)};

  // obj.get_featured_city = function(){
  //   Restangular.all('photos').customGET('featuredCity').then(function(response){
  //     obj.featured.cities = response;

  //   });
  // };

  //Grabbing photos from Instagram by place and date
  obj.get_future_city = function(date, place){
    var d = new Date(date);
    min = d.setHours(0,0,0,0);
    max = d.setHours(24,0,0,0);

    Restangular.all('photos').customGET('futureCity',
      { time : {min: min, max: max},
        place : place
      }).then(function(response){
         //Moving map center 
          console.log("Center ", obj.featured.center);

          // obj.featured.map.panTo(obj.featured.center);

          // Updating data
          obj.featured.cities = response;
          obj.updateMarkers(place);
        });
    
    // .catch(console.log.bind(console));
  };

  obj.updateMarkers = function(center){
      //Removing old markers
       if (obj.featured.markers){obj.featured.markers.clearLayers();}
       // if (obj.featured.cicles) {obj.featured.cicles.clearLayers();}
      

      // Adding photos to map
      angular.forEach(obj.featured.cities.data, function(spot){
      var new_marker = L.marker([spot.location.latitude, spot.location.longitude]).bindPopup('<h4>@'+spot.user.username+'</h4> <h5>in '+spot.location.name).addTo(obj.featured.markers);
      });

      //Adding a cicle
      // var new_cicle = L.circle([center.location.lng, center.location.lat], 1700, {
      //   color: 'red',
      //   fillColor: '#f03',
      //   fillOpacity: 0.5
      // }).addTo(obj.featured.cicles);
  };

  obj.showForecast = function(date, place){
    obj.get_future_city(date, place);
  };

  obj.geo = {};
  // obj.geo.features = [{text: "Paris, France"}];


  //Autocomplite search by place
  obj.getGeoData = function(address){
    return $http({
            method: 'GET',
            url: 'https://api.mapbox.com/v4/geocode/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYXl2YSIsImEiOiJjaWY0OXE0NWkzNXc1c2ttMms0dzlkdHI0In0.-KmRnZgS76kFVEcBCNJG6Q'
          }).then(function(response) {
              //Address coords
              obj.geo.features = response.data.features;
              obj.geo.r = response;
              obj.geo.places = response.data.features.map(function(element){ return {name: element.place_name,
                                  location: { lng: element.center[0],
                                              lat: element.center[1]
                                            }
                                  };
                        });

              return obj.geo.places;

        }, function errorCallback(response) {
          console.log("No geo info returned for address ", address);
   
        });
  };

  return obj;

}]);