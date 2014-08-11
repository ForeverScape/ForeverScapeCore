(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory('generalUtils',
        function(){

            return{

                path: {

                    combine:function( ) {

                        var chunks = [];
                        var argumentsArray = [].slice.apply(arguments);
                        for (var i = 0; i < argumentsArray.length; i++)
                        {
                            var a = argumentsArray[i];
                            while( a.charAt( a.length - 1 ) === '/')
                            {
                                a = a.substring( 0, a.length - 1);
                            }
                            chunks.push( a );
                        }
                        return chunks.join('/');
                    }

                },
                string:
                {
                    pad: function(str, padString, length)
                    {
                        str = str.toString();

                        while (str.length < length)
                            str = padString + str;
                        return str;
                    }
                }

            }

    });

}());