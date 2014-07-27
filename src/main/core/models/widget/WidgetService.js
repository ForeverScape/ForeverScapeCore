(function() {
    'use strict';

    var modelName = "Widget";
    var serviceName = modelName +  "Service";

    angular.module('FScapeApp.Services').factory(serviceName,function(BaseHttpService, $http) {

            var service = new BaseHttpService();

            service.modelName= modelName;
            service.servicePath= 'widget';

            service.rateWidget = function(id,value){
                var url = 'widget/:version/' +id;
                return $http({
                    url: this.buildResourcePath( url ),
                    method: 'PUT',
                    data:{
                        rating: value
                    },
                    params:{}
                });
            };

            return service;
        }
    )

}());