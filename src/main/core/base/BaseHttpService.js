(function() {
    'use strict';

    // Abstract resource
    angular.module('FScapeApp.Services').factory('BaseHttpService', function($http, settings){
        return function(){
            return {

                buildResourcePath: function (sp) {
                    var path = sp;
                    var finalUrl = '';

                    if (sp === undefined) {
                        path = this.servicePath;
                    }
                    var endpoint = settings.serviceConfig.endpoints[path];

                    if( endpoint === undefined || endpoint === null)
                    {
                        throw new Error('\n\n > WARNING! Please add a node in the settings file for your endpoint(' + path+'). < \n \n');
                    }

                    if(endpoint.version !== '' )
                    {
                        finalUrl = endpoint.absoluteUrl + '/' + endpoint.version + '/';
                    } else {
                        finalUrl = endpoint.absoluteUrl;
                    }

                    if( finalUrl.charAt( finalUrl.length - 1 ) !== '/')
                    {
                        finalUrl = finalUrl + '/';
                    }
                    return finalUrl;
                },

                //
                //
                //      Basic API Functionality
                //
                //

                /* basic query, gets all rows in table */
                getAll: function () {
                    var url = this.buildResourcePath();

                    return $http({
                        url: url,
                        method: 'GET',
                        data: {}, // json data
                        params: {} // querystring map
                    });

                },

                /* get by an arbitrary key value */
                getBy: function (key, value) {
                    var url =  this.buildResourcePath() + key + '/' + value;
                    return $http({
                        url: url,
                        method: 'GET',
                        data: {}, // json data
                        params: {} // querystring map
                    });
                },

                /* basic add, saves a new item */
                add: function (data) {
                    var url = this.buildResourcePath();
                    return $http({
                        url:url,
                        method: 'POST',
                        data: data, // json data
                        params: {} // querystring map
                    });
                },

                /* basic update */
                update: function (data) {
                    var id = '';

                    if (data.id !== undefined && data.id !== null) {
                        id = data.id;
                    }
                    var url = this.buildResourcePath();
                    return $http({
                        url: url,
                        method: 'PUT',
                        data: data, // json data
                        params: {} // querystring map
                    });
                },

                /* for testing error handling */
                raiseTestHttpError: function () {

                    var url = 'jiggy';
                    return $http({
                        url: 'http://localhost:8282/jiggy',
                        method: 'DELETE',
                        data: {
                            nothing:'to see here'
                        },
                        params: {}
                    });
                }
            };

        };

    });

}());