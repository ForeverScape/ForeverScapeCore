(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory("ErrorService",function() {
        return {
            errorMessage: null,
            dataSaved: function( data )
            {
                this.errorMessage = data;
            },
            setErrorMessage: function(data )
            {

            }
        };
    })

}());