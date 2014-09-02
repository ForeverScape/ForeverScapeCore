(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory('fscapeService',
        function($location, $cookies, $rootScope) {




            return {


                isPlaying: false,
                offsetX:0,
                offsetY:0,


                init: function()
                {
                    this.isPlaying = false;
                    this.offset = {};
                },
                togglePlayback: function(){

                    this.isPlaying = ! this.isPlaying;
                    $rootScope.$broadcast('fscape.togglePlayback');
                }
            };



        });

}());