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
            scaffoldBase: 'http://localhost:8383',
            serviceBase: '',
            endpoints: {
                product: {
                    target: 'scaffoldBase',
                    version: "v1"
                },
                widget: {
                    target: 'scaffoldBase',
                    version: "v1"
                },
                season: {
                    target: 'scaffoldBase',
                    version: "v1"
                }
            }
        }
    };
});