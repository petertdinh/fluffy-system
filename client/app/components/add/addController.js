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
    };

    // $scope.submitPost = function(recipe){
    //     var params = {
    //         timeStamp : String(moment()._d).slice(4,21),
    //         comments: $scope.comments,
    //         recipe: recipe.title,
    //         picture: $scope.myFile,
    //     };
    //     console.log(params);
    //  $http.post('/add', params)
    //         .success(function(){    
    //         })
    //         .error(function(){
    //         });
    // }
    
    //call get recipes when controller is loaded
    $scope.getRecipes();
    
    $scope.setRecipe = function(recipe){
        $scope.ingredients = recipe.ingredients;
        $scope.instructions = recipe.instructions;
    }    
    });