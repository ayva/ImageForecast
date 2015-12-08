futugram.controller('mainCtrl', ['$scope', '$rootScope', '$http', 'storage', 'current_user', 'main', function ($scope, $rootScope, $http, storage, current_user, main) {

    $scope.$on('photos:uploaded', function (event) {
        console.log("Got confirmation photos uploaded!", storage.weather);
        setTimeout(main.wrapFirstPhoto, 1000);
    });
    $scope.$on('calendar:uploaded', function (event, date) {
        console.log("date uploaded!");
        storage.search.date = new Date(
            date.date.selectedYear,
            date.date.selectedMonth,
            date.date.selectedDay
        );
    });

    $scope.days = main.daysInMonth(new Date().getMonth() + 1, new Date().getFullYear());
    $scope.steps = '1,' + main.daysInMonth(new Date().getMonth() + 1, new Date().getFullYear());
    $scope.month = new Date().getMonth();

    $scope.printMonth = function (month) {
        $scope.month = month;
        $scope.days = main.daysInMonth(month, new Date().getFullYear());
        $scope.steps = '1,' + main.daysInMonth(month, new Date().getFullYear());
        main.daysInSlider($scope.days);
        main.initSlider($scope.steps);
        var temp = storage.search.date;
        storage.search.date = new Date(
            temp.getFullYear(),
            month,
            temp.getDate()
        );
    };

    $scope.current_user = storage.current_user;
    console.log("In main ctrl current user is", current_user);
    $scope.geo = storage.geo;

    $scope.getPlaces = storage.getGeoData;

    $scope.searchForm = {};
    $scope.searchForm = storage.search;

    $scope.search = storage.search;

    $scope.featured = storage.featured;

    $scope.weather = storage.weather;
    //$scope.formattedDate = $scope.searchForm.date.getMonth()+1+'/'+$scope.searchForm.date.getDate()+'/'+$scope.searchForm.date.getFullYear();
    $scope.formattedDate = $scope.searchForm.date.format("mm/dd/yy");
    $scope.isDisabled = $scope.current_user.data ? false : true;


    $scope.showForecast = function () {
        $('.weather-info')[0].style.display = 'none';
        //New search query
        storage.search.place = $scope.searchForm.place;

        storage.featured.center.lng = $scope.searchForm.place.location.lng;
        storage.featured.center.lat = $scope.searchForm.place.location.lat;
        //Moving map
        $scope.featured.map.panTo($scope.featured.center);
        //Laoding photos
        storage.showForecast($scope.searchForm.date, $scope.searchForm.place);
    };

    // Building map
    $scope.map = L.map('map', {
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
    $scope.map.on('click', function (e) {
        if ($scope.current_user.data) {
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
                {
                    name: storage.search.place.name,
                    location: {
                        lng: lng,
                        lat: lat
                    }
                }
            );

        }
    });


    $scope.date = new Date(Date.now());
    //Show data for Paris
    storage.get_featured_city($scope.date, {
            name: "Paris",
            location: {
                lng: 2.344694,
                lat: 48.858093
            }
        }
    );
    main.init();
    main.daysInSlider($scope.days);
    main.initSlider($scope.steps);

    $("#slider-input").bind("slider:changed", function (event, data) {
        var date = {
            selectedYear: new Date().getFullYear(),
            selectedDay: data.value,
            selectedMonth: $scope.month
        };
        $rootScope.$broadcast('calendar:uploaded', {date: date});
    });

}]);