(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory('RedirectionService',
        function($location) {

        return {

            hasRedirect: function(){

                return false
            },

            setRedirectUrl: function( url ) {


            },

            redirect: function()
            {


            },



            getRedirectUrl: function()
            {

            }


        };



    });

}());