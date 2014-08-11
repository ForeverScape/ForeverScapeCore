(function() {
    'use strict';

    angular.module('FScapeApp.Directives').directive('foreverscapeEngine', function(){
        return {
            restrict: 'E',
            replace: true,
            controller:'foreverScapeEngineController',
            controllerAs: 'fscapeEngineCtrl',
            templateUrl: 'main/core/components/foreverscapeEngine/foreverscape-engine.tpl.html'
        };
    });

}());