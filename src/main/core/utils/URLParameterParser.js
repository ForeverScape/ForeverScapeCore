(function() {
    'use strict';

    angular.module('FScapeApp.Services').service('URLParameterParser', [ '$routeParams' ,function($routeParams) {

        var parserService = {

            getMap:function(strValue) {

                var map = {};

                if( strValue === undefined)
                {
                    return map;
                }

                var arr = ['padding'];
                arr = arr.concat( strValue.split('/') );

                for( var i = 0; i < arr.length; i ++ )
                {
                    if( i % 2 === 0 && i !== 0)
                    {
                        map[arr[i-1]] = arr[i];
                    }
                }
                return map;
            },

            buildPath: function( map )
            {
                var arr = [];
                var path;

                for (var property in map) {
                    if (map.hasOwnProperty(property)) {
                        arr.push(property);
                        arr.push(map[property]);
                    }
                }

                path = arr.join("/");

                return path;
            }
        };

        return parserService;

    }]);

}());