angular.module('FScapeApp.Controllers', ['FScapeApp.Modals']);
angular.module('FScapeApp.Modals', ['ngRoute', 'ngResource', 'appSettings']);
angular.module('FScapeApp.Models', ['ngRoute', 'ngResource', 'appSettings']);
angular.module('FScapeApp.Services', ['ngRoute', 'ngResource', 'appSettings']);
angular.module('FScapeApp.Directives', ['ngRoute', 'ngResource', 'appSettings']);
angular.module('FScapeApp.Filters', ['ngRoute', 'ngResource', 'appSettings']);
angular.module('FScapeApp.Providers', ['ngRoute', 'ngResource', 'appSettings']);

var app = angular.module('FScapeApp', [
    'ngTouch',
    'ngCookies',
    'FScapeApp.Modals',
    'FScapeApp.Models',
    'FScapeApp.Controllers',
    'FScapeApp.Services',
    'FScapeApp.Directives',
    'FScapeApp.Filters',
    'FScapeApp.Providers'
]);

app.config( function($routeProvider ) {
        'use strict';

        $routeProvider
            .when('/test', {
                templateUrl: 'main/app/pages/testbed/testbed.tpl.html'
                //controller: 'HomeController'
            })


        // $locationProvider.html5Mode(true); <-- this will remove the (#)hash from the url, but causes some issues
    }
);

app.run(['$rootScope', '$route', '$location',
    function($rootScope, $route, $location) {
        'use strict';

        // bind the '$locationChangeSuccess' event on the rootScope
        $rootScope.$on('$routeChangeStart', function() {

        });

        // bind the '$locationChangeSuccess' event on the rootScope
        $rootScope.$on('$locationChangeSuccess', function() {

        });

    }
]);
