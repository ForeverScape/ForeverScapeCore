(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory('fscapeService',
        function($location, $rootScope) {

            return {


                isPlaying: false,

                offsetX: -200,
                offsetY: -900,

                zoom:.5,
                zoomMax: 1.6, //these might get bumped up if window size is really big
                zoomMin:.45,   //these might get bumped up if window size is really big

                dx: 0,
                dy: 0,

                init: function()
                {
                    this.isPlaying = false;
                },
                togglePlayback: function(){

                    this.isPlaying = ! this.isPlaying;
                    $rootScope.$broadcast('fscape.togglePlayback');
                },

                setDx: function(dx)
                {
                    this.dx = dx;
                },
                setDy: function(dy)
                {
                    this.dy = dy;
                },

                setOffsetX: function( x )
                {
                    this.offsetX = x;
                    $rootScope.$broadcast('fscape.setPosition');
                },

                setOffsetY: function( y )
                {
                    this.offsetY = y;
                    $rootScope.$broadcast('fscape.setPosition');
                },

                setZoom: function (val){
                    this.zoom = val;
                    $rootScope.$broadcast('fscape.setZoom');
                }

            };



        });

}());