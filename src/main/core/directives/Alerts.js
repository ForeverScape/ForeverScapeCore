app.directive('alertSuccess', ['$http', '$parse', function($rootScope) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModelController) {

        }
    };
}]);