(function() {
    'use strict';

    angular.module('FScapeApp.Directives').directive('mainMenu', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'main/core/components/nav/menu.html'
        };
    });

}());