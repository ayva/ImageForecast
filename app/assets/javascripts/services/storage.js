futugram.service('storage',['$http','Restangular', function($http,Restangular){
  var obj = {};

  obj.featured = {};

  obj.get_featured_city = function(){
    Restangular.all('photos').customGET('featuredCity').then(function(response){
      obj.featured.cities = response;

    });
  };
  obj.get_future_city = function(date, place){
    // timeNow = Date.now();
    // min = timeNow - 60*60*24*365*1000;
    // max = min + 60*60*24*7*1000;
    console.log("Date is ",date);
    var d = new Date(date);
    min = d.setHours(0,0,0,0);
    max = d.setHours(24,0,0,0);
    console.log(min, max);
    console.log("Getting future photos");
    Restangular.all('photos').customGET('futureCity',
      { time : {min: min, max: max},
        place : place
      }).then(function(response){
      // response.data.forEach(
      //   function(element, index){
      //   element.created_date =  new Date(element.created_time*1000);
      // });
      obj.featured.cities = response;

    });
    // .catch(console.log.bind(console));
  };

  obj.showForecast = function(date, place){
    obj.get_future_city(date, place);
  };

  obj.geo = {};
  obj.geo.features = [{text: "Paris, France"}];



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
              return obj.geo.features;

        }, function errorCallback(response) {
          console.log("No geo info returned for address ", address);
   
        });
  };

  return obj;

}]);