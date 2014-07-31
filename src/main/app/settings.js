var settingsModule = angular.module('appSettings', []);

settingsModule.factory('settings', function() {
    'use strict';

    return {
        baseURL: function () {
            var pathArray = window.location.href.split('/');
            var protocol = pathArray[0];
            var host = pathArray[2];
            var url = protocol + '//' + host;
            return url;
        },
        isLocalDev: function () {
            var regexTestIfDev = new RegExp('fscape');
            return regexTestIfDev.test(this.baseURL());
        },
        serviceConfig: {
           endpoints: {
                config: {
                    absoluteUrl: 'http://staging.foreverscape.com/services/',
                    version: "v1"
                },
               tile:{
                   absoluteUrl: 'http://staging.foreverscape.com/services/',
                   version:"v1"
               }
            }
        }
    };
});