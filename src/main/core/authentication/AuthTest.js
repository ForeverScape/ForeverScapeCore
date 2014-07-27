(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory('AuthTest', ['$resource',
        function($resource) {


            var Widget = $resource('https://shop-dev.nike.net/das/secureTokens.json', {
                widgetId: '@widgetId'
            }, {


            });
            return Widget;
        }
    ]);
}());