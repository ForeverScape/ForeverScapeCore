(function() {
    'use strict';

    angular.module('FScapeApp.Modals').factory('ErrorModal', [ 'btfModal', function(btfModal) {
        return btfModal({
            //controller: 'DebuggerController',
            controllerAs: 'DebugCtrl',
            templateUrl: 'main/core/modals/errorModal/error.tpl.html',
            wrapperUrl: 'main/core/overlay-containers/fullscreen/overlay.tpl.html'

        });
    }]);

}());