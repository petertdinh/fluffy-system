'use strict';
angular.module('app.auth', [])
	.controller('authController', function($scope, $window, $location, Auth){
		$scope.user = {};

		$scope.login = function(){
			console.log($scope.user);
			Auth.login($scope.user)
			.then(function (token){
				$window.localStorage.setItem('com.bomb', token);
				$location.path('/home');
			})
			.catch(function(err){
				console.log(err);
				$scope.user.err = true;
			});
		};

		$scope.signup = function(){
			Auth.signup($scope.user)
			.then(function (token){
				$window.localStorage.setItem('com.bomb', token);
				$location.path('/home');
			})
			.catch(function (err){
				console.log(err);
				$scope.user.err = true;
			});
		};
	})