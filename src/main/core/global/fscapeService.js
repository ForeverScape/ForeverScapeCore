(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory('fscapeService',
        function($location, $cookies, $rootScope) {

            return {


                isPlaying: false,
                offsetX:0,
                offsetY:0,

                zoom:.5,
                zoomMax: 1.6, //these might get bumped up if window size is really big
                zoomMin:.45,   //these might get bumped up if window size is really big

                init: function()
                {
                    this.isPlaying = false;
                    this.offset = {};
                },
                togglePlayback: function(){

                    this.isPlaying = ! this.isPlaying;
                    $rootScope.$broadcast('fscape.togglePlayback');
                },

                setOffsetX: function( val )
                {
                    this.offsetX = val;
                },

                setOffsetY: function( val )
                {
                    this.offsetY = val;
                },

                setZoom: function (val){
                    this.zoom = val;
                    $rootScope.$broadcast('setZoom');
                }

            };



        });

}());