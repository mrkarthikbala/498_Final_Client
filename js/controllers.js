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

  Errands.getErrands("").success(function(response){
    $scope.errands = response.data;
    $scope.amount =  []; 
    
    $scope.getBest = function(errand) {

        //MAKE SURE THESE ARE SET CORRECTLY
        $scope.bestBidAmount = 1000000000000000;
        $scope.bestBid;

        for(var j=0; j < errand.bids.length; j++) {
          if(errand.bids[j].bidAmount < $scope.bestBidAmount) {
            $scope.bestBidAmount = errand.bids[j].bidAmount;
            $scope.bestBid = errand.bids[j];
          }
        }
        return $scope.bestBid;
        //return the actual bids not the amount
    };

    for (var i =0; i < $scope.errands.length; i++) {
      $scope.errands[i]['bestBid']= $scope.getBest($scope.errands[i]);
    }

      });
}]);


errandControllers.controller('errandDetailController', ['$scope', '$routeParams', '$http', 'Errands', '$window' , function($scope, $routeParams, $http, Errands, $window) {
  
  $scope.ErrandId = $routeParams.errandID;
  Errands.getErrand($scope.ErrandId).success(function(response){
    $scope.errands = response.data;
  });
}]);

errandControllers.controller('profileController', ['$scope', '$routeParams', '$http', 'Users', '$window' , function($scope, $routeParams, $http,  Users, $window) {

  $scope.UserId = $routeParams.usersId;
  Users.getUser($scope.UserId).success(function(response){
    $scope.user = response.data;
    $scope.tasksPostedByUser = '?where={"createdName": $scope.user.name}';
  });
}]);

errandControllers.controller('addErrandController', ['$scope' , '$window' , function($scope, $window) {

}]);


