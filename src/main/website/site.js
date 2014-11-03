app.config( function($routeProvider ) {
        'use strict';

        $routeProvider
            .when('/', {
                templateUrl: 'main/website/pages/home/home.tpl.html'
                //controller: 'HomeController'
            })


        // $locationProvider.html5Mode(true); <-- this will remove the (#)hash from the url, but causes some issues
    }
);