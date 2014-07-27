(function() {
    'use strict';


    angular.module('FScapeApp.Controllers').controller('OverlayController', ['$scope', '$element', '$controller',
    function($scope, $element, $controller) {
        var controller = {
            scope: null,
            overlay: null,
            showHelpIcon: false,
            showCloseIcon: true,
            showOverlay: false,
            deactivateOnShadowClick: true,

            init: function($scope, $element) {

                var that = this;

                this.scope = $scope;
                this.overlay = $element;

                this.$scope = $scope;
                $('body').addClass('noscroll');

                this.showOverlay = true;

                $scope.$on('$destroy', function(){

                });

                $scope.$on('closeOverlay', function(){
                    that.close();
                });


                this.defineListeners();
            },


            defineListeners:function(){

            },
            undefineListeners:function(){

            },

            onShadowClick: function(e){
                if (this.deactivateOnShadowClick && this.overlay && e.target === this.overlay[0]) {
                    this.close();
                }
            },

            close: function() {

                $('body').removeClass('noscroll');
                //TODO: ANIMATE HERE
                     // DESTROY LISTENERS
                     //- ANIMATE
                     //- AFTER ANIMATE
                           //- REMOVE ELEMENT

                angular.element( this.overlay).remove();

                // the following would destroy the outter shell too!! Don't do it.
                //this.scope.$destroy();
            },

            show: function() {
                this.showOverlay = true;
                this.defineListeners();
                this.scope.$digest();
            }
        };
        controller.init($scope, $element);
        return controller;
        }
    ]);


}());
