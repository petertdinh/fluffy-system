'use strict';
angular.module('app', [
    //angular modules
    'ui.router',
    'ngFileUpload',
  	//animation dependencies
    'ngAnimate',
    'ng-fx',
    '720kb.fx',
    //custom modules
    'app.add',
    'app.home'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/');
    
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