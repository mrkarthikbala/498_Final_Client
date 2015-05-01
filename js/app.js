var errandApp = angular.module('errandApp', ['ngRoute', 'errandControllers', 'errandServices', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'timer']);

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

angular.module('plunker', ['ui.bootstrap', 'ui.bootstrap.datetimepicker'])

var DateTimePickerDemoCtrl = function ($scope, $timeout) {
  $scope.dateTimeNow = function() {
    $scope.date = new Date();
  };
  $scope.dateTimeNow();
  
  $scope.toggleMinDate = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
   
  $scope.maxDate = new Date('2014-06-22');
  $scope.toggleMinDate();

  $scope.dateOptions = {
    startingDay: 1,
    showWeeks: false
  };
  
  // Disable weekend selection
  $scope.disabled = function(calendarDate, mode) {
    return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
  };
  
  $scope.hourStep = 1;
  $scope.minuteStep = 15;

  $scope.timeOptions = {
    hourStep: [1, 2, 3],
    minuteStep: [1, 5, 10, 15, 25, 30]
  };

  $scope.showMeridian = true;
  $scope.timeToggleMode = function() {
    $scope.showMeridian = !$scope.showMeridian;
  };
  
  $scope.resetHours = function() {
    $scope.date.setHours(1);
  };
};