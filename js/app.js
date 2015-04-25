var errandApp = angular.module('errandApp', ['ngRoute', 'errandControllers', 'errandServices']);

errandApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'settingsController'
  }).
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'loginController'
  }).
  when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'signupController'
  }).
  when('/errands', {
    templateUrl: 'partials/errands.html',
    controller: 'errandsController'
  }).
  when('/errands/:errandID', {
    templateUrl: 'partials/errandDetails.html',
    controller: 'errandDetailController'
  }).
  when('/profile/:usersId', {
    templateUrl: 'partials/profile.html',
    controller: 'profileController'
  }).
  when('/addErrand', {
    templateUrl: 'partials/addErrand.html',
    controller: 'addErrandController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);