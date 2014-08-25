(function() {
    'use strict';

    angular.module('FScapeApp.Directives').directive('navigation', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'main/core/components/nav/navigation.html'
        };
    });

}());