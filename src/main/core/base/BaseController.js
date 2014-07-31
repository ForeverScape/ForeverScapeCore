(function() {
    'use strict';

    angular.module('FScapeApp.Controllers').service('BaseController', function($routeParams,$location) {

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

                    this.urlParams = this.getMap($routeParams.wildcard);
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

                },

                getMap:function(strValue) {

                    var map = {};

                    if( strValue === undefined)
                    {
                        return map;
                    }

                    var arr = ['padding'];
                    arr = arr.concat( strValue.split('/') );

                    for( var i = 0; i < arr.length; i ++ )
                    {
                        if( i % 2 === 0 && i !== 0)
                        {
                            map[arr[i-1]] = arr[i];
                        }
                    }
                    return map;
                },

                buildPath: function( map )
                {
                    var arr = [];
                    var path;

                    for (var property in map) {
                        if (map.hasOwnProperty(property)) {
                            arr.push(property);
                            arr.push(map[property]);
                        }
                    }

                    path = arr.join("/");

                    return path;
                }

            };
        }
    });


}());