var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

demoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/firstview', {
    templateUrl: 'partials/firstview.html',
    controller: 'FirstController'
  }).
  when('/secondview', {
    templateUrl: 'partials/secondview.html',
    controller: 'SecondController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/llamalist', {
    templateUrl: 'partials/llamalist.html',
    controller: 'LlamaListController'
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
    controller: 'TasksController'
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