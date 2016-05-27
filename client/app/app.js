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
            authentication: true,
        })
        .state('landing', {
            url: '/',
            templateUrl: 'app/components/landing/landingView.html',
            controller: 'landingController',
            authenticate: false,
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
})