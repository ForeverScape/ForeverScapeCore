(function() {

    'use strict';
    angular.module('FScapeApp.Controllers').controller('GlobalController',
        function($scope, settings, BaseController,$rootScope,ErrorModal, SuccessModal, GlobalModelService) {

            var c = {
                onInit: function() {

                    this.$scope = $scope;

                    app.$globalScope = this.$scope;
                    app.settings = settings;

                    GlobalModelService.setSuccessCallback( this.showSuccess );

                    $rootScope.$on( 'serverError', this.showError.bind(this) );
                },


                showSuccess: function(data)
                {
                    SuccessModal.activate();
                },

                showError: function(data)
                {
                    ErrorModal.activate();
                }

            };

            angular.extend( c , new BaseController($scope) );
            c.init();
            return c;

        }

    );

}());