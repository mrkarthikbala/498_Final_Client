var errandControllers = angular.module('errandControllers', []);

errandControllers.controller('settingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;
  // $window.sessionStorage.baseurl  = "http://localhost:4000";
  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

  var windowheight = $(window).height()-80;

  $('#picture').css('height', ""+ (windowheight)+"px" );
  $('#dynamicTextBox').css('top', ""+ (windowheight/2)-50+"px" );
  $('a[href*=#]').click(function(event){
    $('html, body').animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top -50
  }, 600);

 $(window).resize(function() {
    var windowheight = $(window).height()-80;
    $('#picture').css('height', ""+ (windowheight)+"px" );
    console.log("hello");
    // $("#arrows").css('top', ""+ (mainHeight/2)+"px" );    
  });


  event.preventDefault();

  });
}]);

errandControllers.controller('navController', ['$scope', 'Users', '$window', function($scope, Users, $window) {
  var loggedInUser = $window.sessionStorage.userEmail;
  $scope.logout = function() {
    $window.sessionStorage.userEmail = undefined;
    $window.sessionStorage._id = undefined;
    $window.sessionStorage.loggedIn = false;
    // $scope.userLoggedIn = $window.sessionStorage.loggedIn;
    window.location.href = "/#/settings/";
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
  $scope.message = "Email and Password Required";
  $scope.showMessage = false;

  $scope.loginUser = function(){
    

   

    if($scope.password != null && $scope.email!=null) {
        
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
        
        window.location.href = "/#/profile/"+response.data._id;
        location.reload(); 
      }).error(function(response){
        console.log(response.message);
        $scope.message = response.message;
        $scope.showMessage = true;
      });


    }else{

      $scope.message = "Email and Password Required";
      $scope.showMessage = true;
    }
  };

}]);

errandControllers.controller('signupController', ['$scope', 'Users', '$window', function($scope, Users, $window) {
$scope.message = "Email and Password Required";
$scope.showMessage = false;

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
            window.location.href = "/#/login/";

        }).error(function(error){
            $scope.message = error.message;
            $scope.showMessage = true;  
            $scope.respClass = "alert";
          });
      }else{

        $scope.message = "Please fill in all required information.";
        $scope.showMessage = true;     
      }
}}]);

errandControllers.controller('errandsController', ['$scope', '$routeParams', '$http', 'Errands', '$window' , function($scope, $routeParams, $http,  Errands, $window) {
  // console.log("loggedIn: "+ $window.sessionStorage.loggedIn);
  $scope.amt = 10;
  $scope.skip = 0;
  $scope.limit = $scope.skip + $scope.amt;
  $scope.thePendingUsersErrands = [];
  $scope.theCompletedUsersErrands = [];
  $scope.showAddButton  = $window.sessionStorage.loggedIn;
  console.log($scope.showAddButton);
  $scope.searchText = $routeParams.text;
  if($scope.searchText == "noSearch"){
    $scope.searchText="";
  }
  $scope.inputValue = $scope.searchText;

  $scope.$watch('inputValue', function(newValue, oldValue) {
    $scope.skip = 0;
});
  $scope.getErrands = function(){
	  Errands.getErrands("?sort={\"name\":1}").success(function(response){
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
	};
	$scope.getErrands();
	//install socket.io here when you get a new bid message recieve it and call get errands
	var socket = io('http://104.131.170.102:4000');
  	//var socket = io('http://localhost:4000');
	socket.on('connect',function() {
	console.log('Client has connected to the server!');
});
  	socket.on('New Bid', function(data) {
  		console.log("bid");
  		$scope.errands=[];
  		$scope.thePendingUsersErrands = [];
  		setTimeout(function(){
  			$scope.getErrands();   		
	},2000);
  		
  	});
}]);

errandControllers.controller('errandDetailController', ['$scope', '$routeParams', '$http', 'Errands', '$window' ,'$interval', function($scope, $routeParams, $http, Errands, $window, $interval) {
  
  $scope.ErrandId = $routeParams.errandID;
  $scope.message = "Email and Password Required";
  $scope.showMessage = false;
  $scope.user={}
  $scope.user.email = $window.sessionStorage.userEmail;


  $scope.getEverything=function(){
          Errands.getErrand($scope.ErrandId).success(function(response){
            $scope.errand = response.data;
         
            //checking if deadline passed while on page
            $scope.checkDeadline = function(){
              var currDate = new Date();
              if($scope.deadline < currDate ){
                location.reload();
              }
              console.log($scope.showBidding);
            };

            //code to intially check if deadline passed
            $scope.deadline = new Date($scope.errand.deadline);
            $scope.showBidding= true;
            var currDate = new Date();
            console.log($scope.deadline < currDate);
            if($scope.deadline < currDate ){   
                  $scope.showBidding = false;           
            }else{
              $interval($scope.checkDeadline, 500);
            }

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

            $scope.bestBid = $scope.getBest($scope.errand);
            
            $scope.dateToEpoch = function(datestring) {
              var deadline = new Date(datestring);
              return deadline.getTime();
            };
            // $scope.epoch = $scope.dateToEpoch($scope.errand.deadline);
            // console.log(typeof($scope.epoch));
          });
  };

  $scope.getEverything();

  $scope.newBid = function(){
    if($scope.bidAmount < $scope.bestBid.bidAmount){
        var newBid = {};
        newBid['bidAmount'] = $scope.bidAmount;
        newBid['bidderID'] = $window.sessionStorage._id;
        newBid['bidderName'] = $window.sessionStorage.userName;
        $scope.errand.bids.push(newBid);

        Errands.updateErrand($scope.errand).success(function(response) {
          console.log("success");
          location.reload();
        }).error(function(response){
          console.log(response.message);
          $scope.message = response.message;
         $scope.showMessage = true;
        });
    }else{
        $scope.message = "Bid must be lower than current lowest bid.";
        $scope.showMessage = true;

    }

  }
    $scope.userLoggedIn = $window.sessionStorage.loggedIn;

    var socket = io('http://104.131.170.102:4000');
  //var socket = io('http://localhost:4000');
  socket.on('connect',function() {
  console.log('Client has connected to the server!');
});
    socket.on('New Bid', function(data) {
      console.log("bid");
      $scope.errands=[];
      $scope.thePendingUsersErrands = [];
      setTimeout(function(){
        $scope.getEverything();      
  },2000);
      
    });
     // console.log($scope.showBidding);
    


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
                for( var i=0; i<$scope.theCompletedUsersErrands.length; i++){
                    $scope.theCompletedUsersErrands[i]['bestBid'] = $scope.getBest($scope.theCompletedUsersErrands[i]);
                }

                for( var i=0; i<$scope.thePendingUsersErrands.length; i++){
                    $scope.thePendingUsersErrands[i]['bestBid'] = $scope.getBest($scope.thePendingUsersErrands[i]);
                }
                console.log($scope.thePendingUsersErrands);
                console.log($scope.theCompletedUsersErrands);


                  // Errands.getErrands("").success(function(response){
                  //     console.log("got all errands");
                  //     $scope.allErrands = response.data;
                  //     $scope.allBiddedErrands = [];
                  //     $scope.allPendingBids = [];
                  //     $scope.allCompletedBids=[];
                  //     $scope.currDate = new Date();
                  //     for(var i=0; i<$scope.allErrands.length; i++){

                  //         for(var j=0; j<$scope.allErrands[i].bids.length; j++){

                  //             if($scope.allErrands[i].bids[j].bidderID == $scope.UserId){
                  //               $scope.allBiddedErrands.push($scope.allErrands[i]);
                  //               $scope.errandDate = new Date($scope.allErrands[i].deadline);
                                
                  //               if( $scope.errandDate <= $scope.currDate){
                  //                   $scope.allCompletedBids.push($scope.allErrands[i]);
                  //               }else{
                  //                   $scope.allPendingBids.push($scope.allErrands[i]);
                  //               }
                  //               console.log("completed");
                  //               console.log($scope.allCompletedBids);
                  //               console.log("pending");
                  //               console.log($scope.allPendingBids);
                  //             }

                  //         }
                  //     }

                  //   });
               




               })

            });
};

  $scope.refreshErrands();

  $scope.deleteErrand = function (errand) {
    Errands.deleteErrand(errand._id).success(function(response){
      $scope.refreshErrands();
      location.reload(); 
    })
  }
}]);

errandControllers.controller('profileBidsController', ['$scope', '$routeParams', '$http', 'Users', 'Errands', '$window' , function($scope, $routeParams, $http,  Users, Errands, $window) {

  $scope.UserId = $routeParams.usersId;
  Users.getUser($scope.UserId).success(function(response){
              $scope.user = response.data;
                Errands.getErrands("").success(function(response){
                      console.log("got all errands");
                      $scope.allErrands = response.data;
                      $scope.allBiddedErrands = [];
                      $scope.allPendingBids = [];
                      $scope.allCompletedBids=[];
                      $scope.currDate = new Date();
                      

                      for(var i=0; i<$scope.allErrands.length; i++){

                          for(var j=0; j<$scope.allErrands[i].bids.length; j++){

                              if($scope.allErrands[i].bids[j].bidderID == $scope.UserId){
                                $scope.allBiddedErrands.push($scope.allErrands[i]);
                                $scope.errandDate = new Date($scope.allErrands[i].deadline);
                                
                                if( $scope.errandDate <= $scope.currDate){
                                    $scope.allCompletedBids.push($scope.allErrands[i]);
                                }else{
                                    $scope.allPendingBids.push($scope.allErrands[i]);
                                }
                                break;
                                console.log("completed");
                                console.log($scope.allCompletedBids);
                                console.log("pending");
                                console.log($scope.allPendingBids);
                              }

                          }
                      }


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
                    for( var i=0; i<$scope.allPendingBids.length; i++){
                        $scope.allPendingBids[i]['bestBid'] = $scope.getBest($scope.allPendingBids[i]);
                    }

                    for( var i=0; i<$scope.allCompletedBids.length; i++){
                        $scope.allCompletedBids[i]['bestBid'] = $scope.getBest($scope.allCompletedBids[i]);
                    }

                    });
  });

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
      window.location.href = "#/errandsSearch/noSearch";
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
      console.log($scope.errand['bids']);

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
      window.location.href = "#/errandsSearch/noSearch";
    }).error(function(response){
      console.log(response.message);
    });
  };


}]);
