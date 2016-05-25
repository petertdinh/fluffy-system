'use strict';
angular.module('app.add', [])
    .controller('addController', function($scope, fileUpload, $http) {
    $scope.ingredients = null;
    $scope.instructions = null;
    
    $scope.getRecipes = function(){
            $http.get('/add')
            .then(function(res){
                $scope.recipes = res.data;
        })
    };

    $scope.submitPost = function(recipe){
        var params = {
            timeStamp : String(moment()._d).slice(4,21),
            comments: $scope.comments,
            recipe: recipe.title,
            picture: $scope.myFile,
        };
        console.log(params);
    	$http.post('/add', params)
            .success(function(){    
            })
            .error(function(){
            });
    }
    
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ');
        console.dir(file);
        fileUpload.uploadFileToUrl(file);
    };
    
    //call get recipes when controller is loaded
    $scope.getRecipes();
    
    $scope.setRecipe = function(recipe){
        $scope.ingredients = recipe.ingredients;
        $scope.instructions = recipe.instructions;
    }    
    })
    .directive('fileModel', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
    })
    .service('fileUpload', function ($http) {
    this.uploadFileToUrl = function(file){
        $http.post('/upload' + String(file.name), file, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
});


