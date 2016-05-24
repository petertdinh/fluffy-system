'use strict';
angular.module('app.add', [])
    .controller('addController', function($scope, fileUpload) {
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ');
        console.dir(file);
        fileUpload.uploadFileToUrl(file);
    };
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
        var fd = new FormData();
        fd.append('file', file);
        $http.post('/upload' + String(file.name) + String(file.type), file, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
});


