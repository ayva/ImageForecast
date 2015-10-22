futugram.service('storage',['Restangular', function(Restangular){
  var obj = {};

  obj.featured = {};

  obj.get_featured_city = function(){
    Restangular.all('photos').customGET('featuredCity').then(function(response){
      obj.featured.cities = response;

    });
  };

  return obj;

}]);