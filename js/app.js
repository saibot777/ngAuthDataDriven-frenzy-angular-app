var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
  .constant('FIREBASE_URL', 'https://frenzy-auth.firebaseio.com');

  // var config = {
  //   apiKey: "AIzaSyDWafZ1PkSF5C_ezB7OOH3DdM1w7nhepnY",
  //   authDomain: "frenzy-auth.firebaseapp.com",
  //   databaseURL: "https://frenzy-auth.firebaseio.com"
  // };

  myApp.run(['$rootScope', '$location',
    function($rootScope, $location) {
      $rootScope.$on('$routeChangeError',
        function(event, next, previous, error) {
          if (error=='AUTH_REQUIRED') {
            $rootScope.message = 'Sorry, you must log in to access that page';
            $location.path('/login');
          } // AUTH REQUIRED
        }); //event info
    }]); //run

  myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController'
      }).
      when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
      }).
      when('/success', {
        templateUrl: 'views/success.html',
        controller: 'SuccessController',
        resolve: {
          currentAuth: function(Authentication) {
            return Authentication.requireAuth();
          } //current Auth
        } //resolve
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
