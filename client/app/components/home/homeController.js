'use strict';
angular.module('app.home', [])
    .controller('homeController', function($scope, $http) {
    	$scope.reverse = true;
    	function getPosts(){
	        $http.get('/home')
	        .then(function(resp){
	        	$scope.feeds = resp.data;
	        	console.log($scope.feeds);
	        })
	    }
	    //calling getPosts on page load.
	    getPosts();
    });

