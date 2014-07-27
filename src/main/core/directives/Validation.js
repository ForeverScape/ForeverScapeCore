app.directive('ensureExpression', ['$http', '$parse', function($http, $parse) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModelController) {
            scope.$watch(attrs.ngModel, function(value) {
                var booleanResult = $parse(attrs.ensureExpression)(scope);
                ngModelController.$setValidity('expression', booleanResult);
            });
        }
    };
}]);

app.directive('someOtherFormValidation', ['$http', '$parse', function($http, $parse) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModelController) {

            scope.$watch(attrs.ngModel, function(value) {
                //validate some stuff
            });
        }
    };
}]);