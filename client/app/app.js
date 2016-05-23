'use strict';
angular.module('app', [
    //angular modules
    'ui.router',
    'ngAnimate',
    'ng-fx',
    '720kb.fx',
    //custom modules
    'app.challenge'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('challenge', {
            url: '/challenge',
            templateUrl: 'app/components/challenge/challengeView.html',
            animation: {
                enter: 'slide-in-left-fade',
                leave: 'slide-out-right-fade',
                speed: 6000
            },
            controller: 'challengeController',
        })
})