'use strict';
angular.module('app', [
    'app.challenge',
    'ui-router'
    ])
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $stateProvider
        .state('challenge', {
            url: '/challenge',
            templateUrl: 'components/challenge/challengeView.html',
            controller: 'challengeController',
        })
})