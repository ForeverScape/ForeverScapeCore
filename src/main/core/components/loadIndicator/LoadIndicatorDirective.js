(function() {
	'use strict';

	angular.module('FScapeApp.Directives').directive('loadIndicator', function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'main/core/components/loadIndicator/indicator.html',
			link: function($scope, element, attrs) {
				$scope.$on("loaderShow", function() {
					return element.show();
				});
				return $scope.$on("loaderHide", function() {
					return element.hide();
				});
			}
		};
	});

}());