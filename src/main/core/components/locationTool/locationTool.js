(function() {
    'use strict';

    angular.module('FScapeApp.Controllers').controller('locationTool',
        function($scope, BaseController,$location,$window) {

            var c = {

                hide: false, // change this to true, the entire header will not show up
                location: $location,

                onInit: function( ) {

                    $scope.win = $window;
                    $scope.isPlaying = false;

                    angular.element( $window).bind( 'resize', this.onResize);
                    angular.element( $window).bind('orientationchange', this.onResize);

                    this.onResize();
                },

                startPlayback: function()
                {
                    $rootScope.$broadcast('startPlayback');

                },
                stopPlayback: function()
                {
                    $rootScope.$broadcast('stopPlayback');

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