var errandControllers = angular.module('errandControllers', []);

errandControllers.controller('settingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);

errandControllers.controller('loginController', ['$scope' , '$window' , function($scope, $window) {

  //Need to figure out sessions
  
  // $scope.url = $window.sessionStorage.baseurl;

  // $scope.setUrl = function(){
  //   $window.sessionStorage.baseurl = $scope.url; 
  //   $scope.displayText = "URL set";

  // };

}]);

errandControllers.controller('signupController', ['$scope' , '$window' , function($scope, $window) {

}]);

errandControllers.controller('errandsController', ['$scope', '$http', 'Errands', '$window' , function($scope, $http,  Errands, $window) {

  Errands.getErrands("").success(function(data){
    $scope.errands = data.data;
  });

}]);

errandControllers.controller('errandDetailController', ['$scope', '$http', 'Errands', '$window' , function($scope, $http, Errands, $window) {

  // Llamas.get().success(function(data){
  //   $scope.llamas = data;
  // });

}]);

errandControllers.controller('profileController', ['$scope', '$http', 'Errands', '$window' , function($scope, $http,  Errands, $window) {

  // Llamas.get().success(function(data){
  //   $scope.llamas = data;
  // });

}]);

errandControllers.controller('addErrandController', ['$scope' , '$window' , function($scope, $window) {

}]);


