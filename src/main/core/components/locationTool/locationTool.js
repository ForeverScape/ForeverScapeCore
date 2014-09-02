(function() {
    'use strict';

    angular.module('FScapeApp.Controllers').controller('locationTool',
        function($scope, BaseController,$location,$window, $rootScope, fscapeService) {

            var c = {

                hide: false, // change this to true, the entire header will not show up
                location: $location,

                onInit: function( ) {
                    $rootScope.fscape = {};

                    $scope.fscapeService = fscapeService;

                    $scope.win = $window;
                    $scope.isPlaying = false;

                    angular.element( $window).bind( 'resize', this.onResize);
                    angular.element( $window).bind('orientationchange', this.onResize);

                    this.onResize();
                },

                togglePlayback: function()
                {
                    fscapeService.togglePlayback();

                },


                onResize: function()
                {

                        if( $scope.windowWidth < 450 || $scope.windowHeight < 478)
                        {
                            // jQuery('.navigation').hide();
                            //jQuery('.title').css('scale',.7);

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