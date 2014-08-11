(function() {
    'use strict';

    var modelName = "tile";
    var serviceName = modelName +  "Service";

    angular.module('FScapeApp.Services').factory(serviceName,function(BaseHttpService, $http) {

            var service = new BaseHttpService();

            service.modelName = modelName;
            service.servicePath = modelName.toLowerCase();

            service.getTiles = function(){
                var url = this.buildResourcePath() + "tiles2000.json";
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