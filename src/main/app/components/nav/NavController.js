(function() {
    'use strict';

    angular.module('FScapeApp.Controllers').controller('NavController',
        function($scope, BaseController,$location) {

            var c = {

                hide: false, // change this to true, the entire header will not show up
                location: $location,

                onInit: function( ) {

                },

                navClass: function(linkName) {

                },

                hideNav: function() {
                    this.hide = true;

                    // just testing out underscore and the settings file stuff
                    _(3).times(function(num) {

                    }, this);
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