(function() {
    'use strict';

    angular.module('FScapeApp.Services').factory("GlobalModelService",function() {

            return {

                updatedData: null,
                successCallback: null,

                dataSaved: function( data )
                {
                    this.updatedData = data;
                    if( this.successCallback )
                    {
                        this.successCallback( this.updatedData );
                    }
                },

                setSuccessCallback: function( func )
                {
                    this.successCallback = func;
                }


            };
        }
    )

}());