(function() {
    'use strict';

    var modelName = "config";
    var serviceName = modelName +  "Service";

    angular.module('FScapeApp.Services').factory(serviceName,function(BaseHttpService, $http) {

            var service = new BaseHttpService();

            service.modelName= modelName;
            service.servicePath= modelName.toLowerCase();

            service.getConfig = function(){
                var url = this.buildResourcePath() + "foreverscape.json";
                return $http({
                    url: url,
                    method: 'GET',
                    data:{},
                    params:{}
                });
            };

            return service;
        }
    )

}());