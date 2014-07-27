(function() {
    'use strict';

    angular.module('FScapeApp.Controllers').service('BaseController', function($routeParams,$location,URLParameterParser) {

        return function (scope) {

            return {

                scope:null,
                urlParams: null,
                rootRoute: null,
                instanceNumber: null,

                /**
                 * Initialize Controller
                 * @param $scope, current controller scope
                 */
                init: function () {
                    this.scope = scope;
                    this.defineListeners();
                    this.instanceNumber = Math.round(Math.random() * 10000) + 1;

                    this.urlParams = URLParameterParser.getMap($routeParams.wildcard);
                    this.route = $location.path().split('/')[1];


                    if (this.onInit) {
                        this.onInit();
                    }
                },


                defineListeners: function () {

                    var that = this;

                    this.scope.$on("$destroy", function(){
                        that.destroy();
                    });

                    if (this.onDefineListeners) {
                        this.onDefineListeners();
                    }
                },



                removeListeners: function () {

                    if (this.onRemoveListeners) {
                        this.onRemoveListeners();
                    }
                },

                /**
                 * Triggered when controller is about
                 * to be destroyed, clear all remaining values.
                 */
                destroy: function () {


                    this.removeListeners();

                    if (this.onDestroy) {
                        this.onDestroy();
                    }

                }

            };
        }
    });


}());