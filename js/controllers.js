var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('FirstController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

demoControllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);


demoControllers.controller('LlamaListController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.llamas = data;
  });


}]);

demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);

demoControllers.controller('LoginController', ['$scope' , '$window' , function($scope, $window) {

  //Need to figure out sessions
  
  // $scope.url = $window.sessionStorage.baseurl;

  // $scope.setUrl = function(){
  //   $window.sessionStorage.baseurl = $scope.url; 
  //   $scope.displayText = "URL set";

  // };

}]);

demoControllers.controller('SignupController', ['$scope' , '$window' , function($scope, $window) {

}]);

demoControllers.controller('TasksController', ['$scope', '$http', 'Tasks', '$window' , function($scope, $http,  Tasks, $window) {

  // Llamas.get().success(function(data){
  //   $scope.llamas = data;
  // });

}]);

demoControllers.controller('TaskDetailController', ['$scope', '$http', 'Tasks', '$window' , function($scope, $http,  Tasks, $window) {

  // Llamas.get().success(function(data){
  //   $scope.llamas = data;
  // });

}]);

demoControllers.controller('ProfileController', ['$scope', '$http', 'Tasks', '$window' , function($scope, $http,  Tasks, $window) {

  // Llamas.get().success(function(data){
  //   $scope.llamas = data;
  // });

}]);

demoControllers.controller('AddErrandController', ['$scope' , '$window' , function($scope, $window) {

}]);


