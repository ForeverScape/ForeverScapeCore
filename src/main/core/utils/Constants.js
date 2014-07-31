(function() {
    'use strict';
    var constantsModule = angular.module('konst', []);
    constantsModule.factory('enums', function() {
        var enums = {

        };

        if (Object.hasOwnProperty('freeze')) {
            Object.freeze(enums);
        }

        return enums;
    });
}());