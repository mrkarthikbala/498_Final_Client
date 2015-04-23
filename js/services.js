angular.module('errandServices', [])
        .factory('CommonData', function(){
        var data = "";
        return{
            getData : function(){
                return data;
            },
            setData : function(newData){
                data = newData;                
            }
        }
    })
    .factory('Users', function($http, $window) {      
        var baseUrl = $window.sessionStorage.baseurl;
        var Users = {};
        Users.getUsers = function(paramString) {
                return $http.get(baseUrl+'/api/users' + paramString);
            }
        Users.postUser = function(user){

            return $http.post(baseUrl + '/api/users' ,user);
        };
        Users.getUser = function(id){
                return $http.get(baseUrl + '/api/users/' + id);
        }
        Users.updateUser = function(user){
            return $http.put(baseUrl + '/api/users/' + user._id, user);
        }
        Users.deleteUser = function(id){
                return $http.delete(baseUrl + '/api/users/' + id);
        }
        return Users;
        
    })
    .factory('Errands', function($http, $window) {      
        var baseUrl = $window.sessionStorage.baseurl;
        var Errands = {};
        Errands.getErrands = function(paramString){
            return $http.get(baseUrl + '/api/errands' + paramString);
        }
        Errands.getErrands = function(id){
            return $http.get(baseUrl + '/api/errands/' + id);
        };
        Errands.postErrand = function(errand){
      
            return $http.post(baseUrl + '/api/errands', errand);
        };
        Errands.updateErrand = function(errand){
            return $http.put(baseUrl + '/api/errands/' + errand._id, errand);
        }
        Errands.deleteErrand = function(id){
            return $http.delete(baseUrl + '/api/errands/' + id);
        }
        return Errands;
    });
