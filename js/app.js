var errandApp = angular.module('errandApp', ['ngRoute', 'errandControllers', 'errandServices']);

errandApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController'
  }).
  when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignupController'
  }).
  when('/tasks', {
    templateUrl: 'partials/tasks.html',
    controller: 'ErrandsController'
  }).
  when('/tasks/:taskID', {
    templateUrl: 'partials/taskDetails.html',
    controller: 'TaskDetailController'
  }).
  when('/profile', {
    templateUrl: 'partials/profile.html',
    controller: 'ProfileController'
  }).
  when('/AddErrand', {
    templateUrl: 'partials/AddErrand.html',
    controller: 'AddErrandController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);