'use strict';
angular.module('app.auth', [])
	.controller('authController', function($scope, Auth){
		$scope.user = {};

		$scope.login = function(){
			console.log($scope.user);
			Auth.login($scope.user);
			//returns a promise, will need to handle that
		};

		$scope.signup = function(){
			Auth.signup($scope.user);
			//returns a promise, will need to handle that
		};
	})