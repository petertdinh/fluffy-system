'use strict';
angular.module('app.add', [])
    .controller('addController', function($scope, fileUpload, $http) {
    $scope.ingredients = null;
    $scope.instructions = null;
    
    $scope.getRecipes = function(){
            $http.get('/add')
            .then(function(res){
                console.log(res.data);
                $scope.recipes = res.data;
        })
    };
    
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
    
    $scope.submit = function(recipe, comments){
        console.log(recipe.title);
        console.log(comments);
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


