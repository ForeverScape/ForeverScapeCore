
(function() {
    'use strict';


/*
 * @license
 * angular-modal v0.3.0
 * (c) 2013 Brian Ford http://briantford.com
 * License: MIT
 */

'use strict';

angular.module('FScapeApp.Modals').
    factory('btfModal', function ($animate, $compile, $rootScope, $controller, $q, $http, $templateCache) {
        return function modalFactory (config) {
            if (!(!config.template ^ !config.templateUrl)) {
                throw new Error('Expected modal to have exactly one of either `template` or `templateUrl`');
            }

            var template      = config.template,
                controller    = config.controller || angular.noop,
                controllerAs  = config.controllerAs,
                container     = angular.element(config.container || document.body),
                wrapperHtml   = null,
                templateHtml  = null,
                outterElem    = null,
                innerElem     = null,
                element       = null,
                callbackSuccess = null,
                callbackError = null,
                html,
                scope;

            if (config.template) {
                var deferred = $q.defer();
                deferred.resolve(config.template);
                // TODO: use case of no wrapper?
                html = deferred.promise;
            } else {


                templateHtml = $http.get(config.templateUrl,{
                    cache: $templateCache
                }).then( function(response){
                    return response.data;
                });

                wrapperHtml = $http.get(config.wrapperUrl,{
                    cache: $templateCache
                }).then( function(response){
                    return response.data;
                });
            }

            function activate (locals, cbSuccess, cbError) {

                callbackSuccess = cbSuccess;
                callbackError = cbError;


                return $q.all({ tHtml: templateHtml, wHtml: wrapperHtml })
                    .then(function(results) {
                        attach(results, locals);
                    });
            }

            function attach (results, locals) {

                outterElem = angular.element(results.wHtml);
                innerElem = angular.element(results.tHtml);

                if (outterElem.length === 0 || innerElem.length === 0) {
                    throw new Error('The template contains no elements; you need to wrap text nodes')
                }


                outterElem.find('overlay-content').append(innerElem);

                $animate.enter(outterElem, container);
                scope = $rootScope.$new();
                if (locals) {
                    for (var prop in locals) {
                        scope[prop] = locals[prop];
                    }
                }
                var ctrl = $controller(controller, { $scope: scope });

                ctrl.success = callbackSuccess;
                ctrl.error = callbackError;

                if (controllerAs) {
                    scope[controllerAs] = ctrl;
                }
                $compile(outterElem)(scope);
            }

            function deactivate () {
e
                var deferred = $q.defer();
                if (element) {
                    $animate.leave(element, function () {
                        scope.$destroy();
                        element = null;
                        deferred.resolve();
                    });
                } else {
                    deferred.resolve();
                }
                return deferred.promise;
            }

            function active () {
                return !!element;
            }

            return {
                activate: activate,
                deactivate: deactivate,
                active: active
            };
        };
    });

}());