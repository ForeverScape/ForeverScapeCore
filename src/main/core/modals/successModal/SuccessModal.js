(function() {
    'use strict';

    angular.module('FScapeApp.Modals').factory('SuccessModal', function(btfModal) {
        return btfModal({
            templateUrl: 'main/core/modals/successModal/success.tpl.html',
            wrapperUrl: 'main/core/overlay-containers/fullscreen/overlay.tpl.html'
        });
    });

}());