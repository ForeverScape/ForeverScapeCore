(function() {
    'use strict';

    angular.module('FScapeApp.Directives').directive('widgetList', function(){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../../main/app/components/widgetView/WidgetList.tpl.html'
        };
    });

    angular.module('FScapeApp.Directives').directive('aoShowAllWidgetsDirective', function(){
        return {
            restrict: 'E',
            replace: true,
            link: function(scope, element) {
                element.on('mousedown', function() {
                    scope.$emit('widget:showAll');
                });
            },
            template: '<span><a style="background-color:#bbbbbb;margin-left:20px;" href=""> (ShowAll NoNavigation) </a></span>'
    };
    });
    angular.module('FScapeApp.Directives').directive('aoShowAllWidgetsLink', function(){
        return {
            restrict: 'E',
            replace: true,
            link: function(scope, element) {
                element.on('mousedown', function() {
                    scope.$emit('widget:showAll');
                });
            },
            template: '<span><a style="background-color:#ffeeff;margin-left:20px;" href="/#/widget"> (ShowAll Permalink) </a></span>'
        };
    });

    angular.module('FScapeApp.Directives').directive('aoCreateNewWidgetButton', function(){
        return {
            restrict: 'E',
            replace: true,
            link: function(scope, element) {
                element.on('mousedown', function() {
                    scope.$emit('widget:showAll');
                });
            },
            template: '<span><a style="background-color:#ffeeff;margin-left:20px;" href="/#/widget/create"> (Create New Widget) </a></span>'
        };
    });

}());