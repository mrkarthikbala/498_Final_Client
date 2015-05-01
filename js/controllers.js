var errandControllers = angular.module('errandControllers', []);

errandControllers.controller('settingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);

errandControllers.controller('loginController', ['$scope' ,'Users', '$window' , '$http', function($scope, Users, $window, $http ) {

  //Need to figure out sessions
  
  // $scope.url = $window.sessionStorage.baseurl;

  // $scope.setUrl = function(){
  //   $window.sessionStorage.baseurl = $scope.url; 
  //   $scope.displayText = "URL set";

  // };
  $scope.loginUser = function(){
     
      $scope.loginRequest = {
        email: $scope.email,
        password: $scope.password
      }
     
      Users.login($scope.loginRequest).success(function(response){
        console.log(response.message);
        $window.sessionStorage.loggedIn = true;
        $window.sessionStorage.userEmail = response.data.email;
        // console.log(response.data);
        // console.log("loggedIn: "+ $window.sessionStorage.loggedIn);
        // console.log("userEmail " + $window.sessionStorage.userEmail );

      }).error(function(response){
        console.log(response.message);
      });

  };

}]);

errandControllers.controller('signupController', ['$scope', 'Users', '$window', function($scope, Users, $window) {

$scope.addUsers = function(){
      
      $scope.newUser = {
         name: $scope.name,
         email: $scope.email,
         password: $scope.password
        }

                  console.log($scope.newUser);


      if(($scope.email!=undefined) && ($scope.name!=undefined) && ($scope.password!=undefined)) {
          Users.postUser($scope.newUser).success(function(response) {
            $scope.email = "";
            $scope.name = "";
            $scope.password = "";
            $scope.message = response.message;
            $scope.messageToSend = true;
            $scope.respClass = "success";
        }).error(function(error){
            $scope.message = error.message;
            $scope.messageToSend = true;
            $scope.respClass = "alert";
          });
      }
}}]);

errandControllers.controller('errandsController', ['$scope', '$http', 'Errands', '$window' , function($scope, $http,  Errands, $window) {
  // console.log("loggedIn: "+ $window.sessionStorage.loggedIn);

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

    $scope.prevPage = function(){
      
    }

    $scope.dateToEpoch = function(datestring) {
      var deadline = new Date(datestring);
      return deadline.getTime();
    };
    
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
}]);


