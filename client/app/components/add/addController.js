'use strict';
angular.module('app.add', [])
   .controller('addController', function($scope, $http) {
   $scope.ingredients = null;
   $scope.instructions = null;
   
   $scope.getRecipes = function(){
           $http.get('/add')
           .then(function(res){
               $scope.recipes = res.data;
       })
   };    $scope.hide = true;
   
   //call get recipes when controller is loaded
   $scope.getRecipes();
   
   $scope.setRecipe = function(recipe){
       $scope.ingredients = recipe.ingredients;
       $scope.instructions = recipe.instructions;
       $scope.title = recipe.title;
   }        });