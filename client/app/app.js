'use strict';
angular.module('app', [
    //angular modules
    'ui.router',
  	//animation dependencies
    'ngAnimate',
    //custom modules
    'app.add',
    'app.home',
    'app.auth',
    'app.services',
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('add', {
            url: '/add',
            templateUrl: 'app/components/add/addView.html',
            controller: 'addController',
            authenticate: true,
        })
        .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/homeView.html',
            controller: 'homeController',
            authenticate: true,
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/components/authentication/loginView.html',
            controller: 'authController',
            authenticate: false,
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/components/authentication/signupView.html',
            controller: 'authController',
            authenticate: false,
        })

        $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function($window){
	var attach = {
		request: function(object){
			var jwt = $window.localStorage.getItem('com.bomb');
			if (jwt) {
				object.headers['x-access-token'] = jwt;
			}
			object.headers['Allow-Control-Allow-Origin'] = '*';
			return object;
		}
	};
	return attach;
})
.run(function ($rootScope, $state, $location, Auth) {
	  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
	    if (toState.authenticate && !Auth.isAuth()){
	      // User isn’t authenticated
	      $state.transitionTo("login");
	      event.preventDefault();
	    }
	  });

  });