(function() {
    'use strict';

    angular.module('FScapeApp.Controllers').controller('playbackController',
        function($scope, BaseController,$window, $rootScope, fscapeService) {

            $scope.fscapeService = fscapeService;

            var c = {

                hide: false, // change this to true, the entire header will not show up

                onInit: function( ) {
                }

            }

            angular.extend( c, new BaseController($scope ));

            c.init();

            return c;
        }
    );


}());