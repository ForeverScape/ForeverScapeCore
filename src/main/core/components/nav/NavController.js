(function() {
    'use strict';

    angular.module('FScapeApp.Controllers').controller('navController',
        function($scope, BaseController,$location,$window) {

            var c = {

                hide: false, // change this to true, the entire header will not show up
                location: $location,

                onInit: function( ) {

                    $scope.win = $window;

                    angular.element( $window).bind( 'resize', this.onResize);
                    angular.element( $window).bind('orientationchange', this.onResize);

                    this.onResize();
                },

                onResize: function()
                {
                    $scope.windowWidth  = $window.innerWidth;
                    $scope.windowHeight = $window.innerHeight;


                    // angular reacts too slow, so i'm doing this classic style
                    // it does not always digest on window size change

                    if( $scope.windowWidth < 450 || $scope.windowHeight < 478)
                    {
                        jQuery('.navigation').hide();
                        jQuery('.title').css('scale',.7);


                        if( $scope.windowHeight < 478 )
                        {
                            TweenMax.to( $('.header-container'), 1,
                                {
                                    css:{height:'40px'}
                                });
                            TweenMax.to( $('.title'), 1,
                                {
                                    css:{scale:.5, right:'-60px'}
                                });
                            TweenMax.to( $('.menu'), 1,
                                {
                                    css:{top:'-4px', scale:.7, left:'1px'}
                                });

                        } else {

                            TweenMax.to( $('.header-container'), 1,
                                {
                                    css:{height:'50px'}
                                });
                            TweenMax.to( $('.title'), 1,
                                {
                                    css:{scale:.7, right:'-40px'}
                                });
                            TweenMax.to( $('.menu'), 1,
                                {
                                    css:{top:'0px', scale:1,left:'1px'}
                                });

                        }



                    } else {
                        jQuery('.navigation').show();

                        TweenMax.to( $('.menu'), 1,
                            {
                                css:{top:'9px', scale:1,left:'10px'}
                            });

                        TweenMax.to( $('.header-container'), 1,
                            {
                                css:{height:'65px'}
                            });



                        TweenMax.to( $('.title'), 1,
                            {
                                css:{scale:1, right:'0px'}
                            });

                    }

                },

                navClass: function(linkName) {

                },

                hideNav: function() {
                    this.hide = true;

                },

                goToSearch: function() {
                    return this.location.path('/product-search');
                },

                goToError: function() {
                    return this.location.path('/error');
                }
            };

            angular.extend( c, new BaseController($scope ));

            c.init();

            return c;
        }
    );


}());