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
			if($scope.user.password === $scope.user.confirm){
				$scope.check = false;
				Auth.signup($scope.user)
				.then(function (token){
						console.log(token);
						$window.localStorage.setItem('com.bomb', token);
						$location.path('/home');
					})
				.catch(function (err){
						console.log(err);
						$scope.user.err = true;
					});
				} else {
					$scope.check = true;
				}
		}

		$scope.isAuth = function() {
		  // will return true if user is logged in
		  return Auth.isAuth();
		};

		$scope.logout = function(){
			console.log('hi');
			Auth.logout();
		}
	});