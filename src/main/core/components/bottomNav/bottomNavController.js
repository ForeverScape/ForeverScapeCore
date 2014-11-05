(function() {
    'use strict';

    angular.module('FScapeApp.Controllers').controller('bottomNavController',
        function($scope, BaseController,$window, $rootScope, fscapeService) {

            var c = {

                hide: false, // change this to true, the entire header will not show up

                onInit: function( ) {
                    angular.element( $window).bind( 'resize', this.onResize);
                    angular.element( $window).bind( 'orientationchange', this.onResize);

                    this.onResize();
                },

                onResize: function()
                {

                    if( $scope.windowWidth < 450 || $scope.windowHeight < 478)
                    {
                        if( $scope.windowHeight < 478 )
                        {

                        } else {

                        }


                    } else {


                    }

                }

            };

            angular.extend( c, new BaseController($scope ));

            c.init();

            return c;
        }
    );


}());