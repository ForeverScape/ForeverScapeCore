(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory('RedirectionService',
        function($location, $cookies) {

        return {

            hasRedirect: function(){
                if( $cookies.loginRedirectUrl)
                {
                    return true;
                }

                return false;
            },

            setRedirectUrl: function( url ) {

                if (url !== null) {
                    if (url.indexOf('login') <= 0 && url.indexOf('timeout') <= 0) {
                        $cookies.loginRedirectUrl = url;
                    }
                }
            },

            redirect: function()
            {
                var url = null;

                if($cookies.loginRedirectUrl )
                {
                    url =  this.getRedirectUrl();
                    this.setRedirectUrl(null);
                }
                if( url !== null)
                {
                    $location.path( url);
                }

            },



            getRedirectUrl: function()
            {
                return $cookies.loginRedirectUrl;
            }


        };



    });

}());