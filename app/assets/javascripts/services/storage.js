futugram.service('storage',['$http','$rootScope','Restangular', function($http, $rootScope, Restangular){
  var obj = {};

  obj.featured = {};
  obj.featured.center = {
    lng: 2.344694,
    lat: 48.858093
    };

  obj.weather = {};

  // obj.getWeather = function(date, place){Restangular.all('photos').customGET('weather', )
  // };


  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  obj.search = { place: { name: "Paris",
                          location: {"lng":37.6067,"lat":55.7617}
                        },
                 date: addDays(new Date(), 1)};


  obj.get_featured_city = function(date, place){
    var d = new Date(date);
    min = d.setHours(0,0,0,0);
    max = d.setHours(24,0,0,0);
    Restangular.all('photos').customGET('featuredCity',
      { time : {min: min, max: max},
        place : place
      }).then(function(response){
        
      if (response.status){
          obj.featured.cities = response.data;
          obj.weather.forecast = response.weather;
          console.log("Tempreture", obj.weather.forecast, " C" );
          $rootScope.$broadcast('photos:uploaded', response);
          console.log("Cities from featured", obj.featured.cities.data.length);
          obj.updateMarkers(place);
      }
      else {
        console.log(response.message);
      }
    });
  };

  obj.current_user = {data: undefined };
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

        if (response.status){
          console.log("Center ", obj.featured.center);

          // obj.featured.map.panTo(obj.featured.center);

          // Updating data
          obj.weather.forecast = response.weather;
          console.log("Tempreture", obj.weather.forecast, " C" );
          obj.featured.cities = response.data;
          console.log("Cities from future", obj.featured.cities);
          obj.updateMarkers(place);
        }
        else {console.log(response.message);}
        });
    
    // .catch(console.log.bind(console));
  };

  obj.updateMarkers = function(center){
      //Removing old markers
       if (obj.featured.markers){obj.featured.markers.clearLayers();}

      // Adding photos to map
      angular.forEach(obj.featured.cities.data, function(spot){
      var new_marker = L.marker([spot.location.latitude, spot.location.longitude]).bindPopup('<h4>@'+spot.user.username+'</h4> <h5>in '+spot.location.name).addTo(obj.featured.markers);
      });

  };

  obj.showForecast = function(date, place){
    obj.get_future_city(date, place);
  };

  obj.geo = {};

  //Autocomplite search by place
  obj.getGeoName = function(location){
    return $http({
            method: 'GET',
            url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location.lng+','+location.lat+'.json?access_token=pk.eyJ1IjoiYXl2YSIsImEiOiJjaWY0OXE0NWkzNXc1c2ttMms0dzlkdHI0In0.-KmRnZgS76kFVEcBCNJG6Q'
          }).then(function(response){
            console.log("Returned names",response.data)
            obj.search.place.name = response.data.features[0].place_name;
          },
          function(error){
            console.log("Name of clicked location was not returned");
          });
  };
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