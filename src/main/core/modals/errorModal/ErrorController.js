(function() {
    'use strict';

    angular.module('FScapeApp.Controllers').controller('ErrorController',
        function($scope, $element, ErrorService,BaseController) {

            var controller = {

                errorService: null,
                el: null,

                onInit: function() {
                    this.el = $element;
                    this.errorService = ErrorService;
                }
            };

            angular.extend( controller, new BaseController($scope));
            controller.init($element);
            return controller;
        }
    );

}());