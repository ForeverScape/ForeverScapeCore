// Abstract resource
angular.module('FScapeApp.Services').factory('BaseHttpService', function($http, settings){
    return function(){
        return {

            buildResourcePath: function (sp) {
                var path = sp;
                if (sp === undefined) {
                    path = this.servicePath;
                }
                var serviceNode = settings.serviceConfig.endpoints[this.modelName.toLowerCase()];
                path = path.toLowerCase().replace(':version', serviceNode.version);

                return settings.serviceConfig[serviceNode.target] + '/' + path;
            },

            //
            //
            //      Basic API Functionality
            //
            //

            /* basic query, gets all rows in table */
            getAll: function () {
                var url = this.servicePath + '/:version';
                return $http({
                    url: this.buildResourcePath(url),
                    method: 'GET',
                    data: {}, // json data
                    params: {} // querystring map
                });

            },

            /* get by an arbitrary key value */
            getBy: function (key, value) {
                var url = this.servicePath + '/:version' + "/" + key + "/" + value;
                return $http({
                    url: this.buildResourcePath(url),
                    method: 'GET',
                    data: {}, // json data
                    params: {} // querystring map
                });
            },

            /* basic add, saves a new item */
            add: function (data) {
                var url = this.servicePath + '/:version';
                return $http({
                    url: this.buildResourcePath(url),
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
                var url = this.servicePath + '/:version/' + id;
                return $http({
                    url: this.buildResourcePath(url),
                    method: 'POST',
                    data: data, // json data
                    params: {} // querystring map
                });
            },

            /* for testing error handling */
            raiseTestHttpError: function () {
                var data = {
                    id: -1,
                    foo: "bar"
                };

                var id = '';

                if (data.id !== undefined && data.id !== null) {
                    id = data.id;
                }

                var url = "jiggy" + '/:version/' + id;
                return $http({
                    url: this.buildResourcePath(url),
                    method: 'POST',
                    data: data, // json data
                    params: {} // querystring map
                });
            }
        }

    };

});
