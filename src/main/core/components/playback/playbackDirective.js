(function() {
    'use strict';

    angular.module('FScapeApp.Directives').directive('playback', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'main/core/components/playback/playback.html'
        };
    });

}());