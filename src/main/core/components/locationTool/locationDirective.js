(function() {
    'use strict';

    angular.module('FScapeApp.Directives').directive('locationTool', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'main/core/components/locationTool/location-tool.html'
        };
    });

}());