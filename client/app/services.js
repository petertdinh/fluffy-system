angular.module('app.services', [])
	.factory('Auth', function($http, $location, $window){

		var login = function(user){
			return $http.post('/login', user)
						.then(function (resp){
							return resp.data.token;
						})
		};

		var signup = function(user){
			return $http.post('/signup', user)
						.then()
		};

		return {
			login: login,
			signup: signup
		};
	})