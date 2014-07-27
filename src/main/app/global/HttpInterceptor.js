(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory('httpInterceptor', function($q, $rootScope, $log, ErrorService) {

        var numLoadings = 0;

        return {
            request: function(config) {

                if( config )
                {
                    if( config.preventLoader === true )
                    {

                    } else {
                        numLoadings++;
                        $rootScope.$broadcast("loaderShow");
                    }
                }

                return config || $q.when(config);
            },
            response: function(response) {

                if ((--numLoadings) === 0) {
                    // Hide loader
                    $rootScope.$broadcast("loaderHide");
                }

                return response || $q.when(response);
            },
            responseError: function(response) {

                if (!(--numLoadings)) {
                    // Hide loader
                    $rootScope.$broadcast("loaderHide");
                }

                if( response.status >= 400 )
                {
                    ErrorService.errorMessage = response;
                    $rootScope.$broadcast("serverError" );

                } else if ( response.status >= 400 && response.status === 404 )
                {
                    ErrorService.errorMessage = "Could not load a dependency: 404";
                    $rootScope.$broadcast("serverError" );
                }



                return $q.reject(response);
            }
        };
    });

    angular.module('FScapeApp.Services').config( function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    });

}());