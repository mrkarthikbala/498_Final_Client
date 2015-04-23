var errandControllers = angular.module('errandControllers', []);

errandControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);

errandControllers.controller('LoginController', ['$scope' , '$window' , function($scope, $window) {

  //Need to figure out sessions
  
  // $scope.url = $window.sessionStorage.baseurl;

  // $scope.setUrl = function(){
  //   $window.sessionStorage.baseurl = $scope.url; 
  //   $scope.displayText = "URL set";

  // };

}]);

errandControllers.controller('SignupController', ['$scope' , '$window' , function($scope, $window) {

}]);

errandControllers.controller('ErrandsController', ['$scope', '$http', 'Errands', '$window' , function($scope, $http,  Errands, $window) {

  Errands.getErrands("").success(function(data){
    $scope.errands = data.data;
  });

}]);

errandControllers.controller('TaskDetailController', ['$scope', '$http', 'Tasks', '$window' , function($scope, $http,  Tasks, $window) {

  // Llamas.get().success(function(data){
  //   $scope.llamas = data;
  // });

}]);

errandControllers.controller('ProfileController', ['$scope', '$http', 'Tasks', '$window' , function($scope, $http,  Tasks, $window) {

  // Llamas.get().success(function(data){
  //   $scope.llamas = data;
  // });

}]);

errandControllers.controller('AddErrandController', ['$scope' , '$window' , function($scope, $window) {

}]);


