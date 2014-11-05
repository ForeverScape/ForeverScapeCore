(function() {
    'use strict';

    angular.module('FScapeApp.Directives').directive('bottomNav', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'main/core/components/bottomNav/bottom-nav.html'
        };
    });

}());