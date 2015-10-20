/*angular.module("WMApp",['ngRoute'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl : 'home.html',
            controller: 'HomeCtrl'
        });
    } ])
    .controller('HomeCtrl',function($scope){

    });;*/


angular.module('WMApp', ['ngRoute'])
    .value('wmCities',['New York','New Jersey','San Diego','Pune','Mumbai'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl'
        }).when('/cities/:city', {
            templateUrl : 'city.html',
            controller : 'CityCtrl',
            resolve: {
                city: function(wmCities, $route, $location){
                    var city = $route.current.params.city;
                    if(wmCities.indexOf(city) == -1){
                        $location.path('/error');
                        return;
                    }
                    return city;
                }
            }
        }).when('/error', {
            template : '<p> Error: Page Not Found! </p>'
        });
    }])
    .controller('HomeCtrl', function($scope) {
        //empty for now
        $scope.test = "sonali";
    })
    .controller('CityCtrl',['$scope','city', function($scope, city) {
        //empty for now
        $scope.city = city;
    }])
    .run(function($rootScope, $location, $timeout) {
        $rootScope.$on('$routeChangeError', function() {
            $location.path("/error");
        });
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            $timeout(function() {
                $rootScope.isLoading = false;
            }, 1000);
        });
    });
