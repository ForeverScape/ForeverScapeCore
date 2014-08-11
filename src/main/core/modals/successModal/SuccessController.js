(function() {
    'use strict';

    angular.module('FScapeApp.Controllers').controller('SuccessController', function($scope, $element, BaseController) {


            var controller = {
                el: null,
                onInit: function() {
                    this.el = $element;
                }
            };

            angular.extend( controller, new BaseController($scope));

            controller.init($element);
            return controller;
        }
    );

}());