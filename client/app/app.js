'use strict';
angular.module('app', [
    //angular modules
    'ui.router',
  	//animation dependencies
    'ngAnimate',
    //custom modules
    'app.add',
    'app.home'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('add', {
            url: '/add',
            templateUrl: 'app/components/add/addView.html',
            controller: 'addController',
        })
        .state('home', {
            url: '/home',
            templateUrl: 'app/components/home/homeView.html',
            controller: 'homeController'
        })
})