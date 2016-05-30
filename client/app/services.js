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
						.then(function (resp){
							return resp.data.token;
						})
		};

		var isAuth = function () {
		  return !!$window.localStorage.getItem('com.bomb');
		};

		var logout = function () {
		  $window.localStorage.removeItem('com.bomb');
		  $location.path('#/login');
		};

		return {
			login: login,
			signup: signup,
			isAuth: isAuth,
			logout: logout,
		};
	})