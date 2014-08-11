(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory('httpInterceptor', function(
        $q, $rootScope, $log, $timeout, settings, $location, ErrorService,RedirectionService) {

        var numLoadings = 0;

        return {
            request: function(config) {

                if( config )
                {
                    if( config.preventLoader !== true ){
                        numLoadings++;
                        $rootScope.$broadcast('loaderShow');
                        

                    }
                }

                return config || $q.when(config);
            },
            response: function(response) {

                if ((--numLoadings) <= 0) {
                    // Hide loader
                    numLoadings = 0;
                    $rootScope.$broadcast('loaderHide');
                }


                return response || $q.when(response);
            },
            responseError: function(response) {

                if (!(--numLoadings)) {
                    // Hide loader
                    $rootScope.$broadcast('loaderHide');
                }

                if( response.status >= 400 )
                {
                    ErrorService.setErrorMessage(response);
                    $rootScope.$broadcast('serverError' );

                } else if ( response.status >= 400 && response.status === 404 )
                {
                    ErrorService.errorMessage = 'Could not load a dependency: 404';
                    $rootScope.$broadcast('serverError' );
                }



                return $q.reject(response);
            }
        };
    });

    angular.module('FScapeApp.Services').config( function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    });

}());