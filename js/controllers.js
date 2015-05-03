var errandControllers = angular.module('errandControllers', []);

errandControllers.controller('settingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);

errandControllers.controller('navController', ['$scope', 'Users', '$window', function($scope, Users, $window) {
  var loggedInUser = $window.sessionStorage.userEmail;
  $scope.logout = function() {
    console.log("grr");
    $window.sessionStorage.userEmail = undefined;
    $window.sessionStorage._id = undefined;
    $window.sessionStorage.loggedIn = false;
    // $scope.userLoggedIn = $window.sessionStorage.loggedIn;
    location.reload(); 
  };
  angular.element(document).ready(function () {
    // alert("hello");
    $scope.userEmail = $window.sessionStorage.userEmail;
    $scope.loggedIn = $window.sessionStorage.loggedIn;
    $scope._id = $window.sessionStorage._id;
    // NG Show Does Work
    // Need to change class manually
  });
  $scope.userEmail = $window.sessionStorage.userEmail;
  $scope.loggedIn = $window.sessionStorage.loggedIn;
  $scope._id = $window.sessionStorage._id;
  $scope.$watchGroup(['userEmail', 'loggedIn','_id'], function(newValues, oldValues) {
    $scope.userEmail = newValues[0];
    $scope.loggedIn = newValues[1];
    $scope._id = newValues[2];
  });

  $scope.userLoggedIn = $window.sessionStorage.loggedIn;



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
        $window.sessionStorage.userName = response.data.name;
        $window.sessionStorage._id = response.data._id;
        // console.log(response.data._id);
        // console.log(response.data);
        // console.log("loggedIn: "+ $window.sessionStorage.loggedIn);
        // console.log("userEmail " + $window.sessionStorage.userEmail );
        window.location.href = "/#/profile/"+response.data._id;
        location.reload(); 
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
  $scope.amt = 10;
  $scope.skip = 0;
  $scope.limit = $scope.skip + $scope.amt;
  $scope.thePendingUsersErrands = [];
  $scope.theCompletedUsersErrands = [];
  $scope.showAddButton  = $window.sessionStorage.loggedIn;
  console.log($scope.showAddButton);
  
  Errands.getErrands("").success(function(response){
    $scope.userEmail = $window.sessionStorage.userEmail;
    $scope.currDate = new Date();
    for (var j=0; j < response.data.length; j++) {
      $scope.errandDate = new Date(response.data[j].deadline);
      if($scope.errandDate >= $scope.currDate) {
          $scope.thePendingUsersErrands.push(response.data[j]);
        }
      else {
        $scope.theCompletedUsersErrands.push(response.data[j]);
      }  
    }
    $scope.errands = $scope.thePendingUsersErrands;

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

    $scope.nextPage = function(){
      $scope.skip += $scope.amt;
      $scope.skip = Math.min($scope.errands.length - $scope.amt, $scope.skip); 
      $scope.limit = $scope.skip + $scope.amt;
    };

    $scope.prevPage = function(){
      $scope.skip -= $scope.amt;
      $scope.skip = Math.max(0, $scope.skip);
      $scope.limit = $scope.skip + $scope.amt;
    };

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

    $scope.bestBid = $scope.getBest($scope.errands);

  $scope.dateToEpoch = function(datestring) {
      var deadline = new Date(datestring);
      return deadline.getTime();
    };

    $scope.dead = $scope.dateToEpoch($scope.errands.deadline);
  });

    $scope.userLoggedIn = $window.sessionStorage.loggedIn;


}]);

errandControllers.controller('profileController', ['$scope', '$routeParams', '$http', 'Users', 'Errands', '$window' , function($scope, $routeParams, $http,  Users, Errands, $window) {

  $scope.UserId = $routeParams.usersId;
  $scope.thePendingUsersErrands = [];
  $scope.theCompletedUsersErrands = [];
  $scope.currDate = new Date();
  console.log($scope.currDate);
  $scope.email = $window.sessionStorage.userEmail;

  $scope.refreshErrands = function(){
            Users.getUser($scope.UserId).success(function(response){
              $scope.user = response.data;

              // $scope.theUsersErrands = [];

               Errands.getErrands('?where={\"createdID\":' + "\"" + $scope.user._id + "\""  + '}').success(function(response){
                console.log(response.data.length);
                for (var j=0; j < response.data.length; j++) {
                  $scope.errandDate = new Date(response.data[j].deadline);
                  if($scope.errandDate >= $scope.currDate) {
                      $scope.thePendingUsersErrands.push(response.data[j]);
                    }
                  else {
                    $scope.theCompletedUsersErrands.push(response.data[j]);
                  }  
                }
                console.log($scope.thePendingUsersErrands);
                console.log($scope.theCompletedUsersErrands);
               })
            });
};

  $scope.refreshErrands();

  $scope.deleteErrand = function (errand) {
    Errands.deleteErrand(errand._id).success(function(response){
      console.log("Refresh");
      $scope.refreshErrands();
      console.log("Done Refreshing");
    })
  }
}]);

errandControllers.controller('addErrandController', ['$scope' , 'Errands', '$window' ,  function($scope, Errands, $window) {
  $scope.dateTimeNow = function() {
    $scope.date = new Date();
  };
  $scope.dateTimeNow();
  
  $scope.minDate = new Date();

  $scope.dateOptions = {
    startingDay: 1,
    showWeeks: false
  };
  
  $scope.hourStep = 1;
  $scope.minuteStep = 5;

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
  $scope.errand = {};
  $scope.errand['createdName'] = $window.sessionStorage.userName;
  $scope.errand['createdID'] = $window.sessionStorage._id;
  console.log("hello");
  // $scope.bid = {
  //   'bidderID':$window.sessionStorage._id, 
  //   'bidderName':$window.sessionStorage.userName
  // };

  $scope.create = function(errand) {
    console.log('hello');
   
    Errands.postErrand(errand).success(function(data, status, headers, config) {
      console.log("added Errand");
    });
  };


}]);

errandControllers.controller('updateErrandController', ['$scope' , '$routeParams', 'Errands', '$window' ,  function($scope, $routeParams,  Errands, $window) {
  
  $scope.errandID = $routeParams.errandID;
  $scope.errand = {};
  $scope.errand['_id'] = $scope.errandID;
  Errands.getErrand($scope.errandID).success(function(response){
      $scope.errandData = response.data;
      
      $scope.errand['createdName'] = $window.sessionStorage.userName;
      $scope.errand['createdID'] = $window.sessionStorage._id;
      $scope.errand['name'] = $scope.errandData.name;
      $scope.errand['description'] = $scope.errandData.description;
      $scope.errand['errandLocation'] = $scope.errandData.errandLocation;
      $scope.errand['deadline'] = $scope.errandData.deadline;
      $scope.errand['bids'] = $scope.errandData.bids;

  });

  $scope.dateTimeNow = function() {
    $scope.date = new Date();
  };
  $scope.dateTimeNow();
  
  $scope.minDate = new Date();

  $scope.dateOptions = {
    startingDay: 1,
    showWeeks: false
  };
  
  $scope.hourStep = 1;
  $scope.minuteStep = 5;

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
 
  // $scope.errand['createdName'] = $window.sessionStorage.userName;
  // $scope.errand['createdID'] = $window.sessionStorage._id;
  // $scope.errand['name'] = $scope.errandData.name;
  // $scope.errand['description'] = $scope.errandData.description;
  // $scope.errand['errandLocation'] = $scope.errandData.errandLocation;
  // $scope.errand['deadline'] = $scope.errandData.deadline;




  $scope.bid = {
    'bidderID':$window.sessionStorage._id, 
    'bidderName':$window.sessionStorage.userName
  };


  $scope.editErrand = function(errand) {
   
    Errands.updateErrand(errand).success(function(response) {
      console.log(response.data);
    });
  };


}]);
