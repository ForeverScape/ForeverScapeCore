describe('WidgetFactory (Mocked) Test', function() {

    var mockWidgetFactory, httpBackend, qArray;

    //var tester = ngMidwayTester('FScapeApp.Resources', { /* options */ });


    beforeEach( angular.mock.module('FScapeApp.Controllers'));

    beforeEach(module('FScapeApp.Models'));
    beforeEach(module('FScapeApp.Services'));
    beforeEach(module('appSettings'));
    beforeEach(module('ngMock'));

    beforeEach(function () {
        angular.mock.inject(function ($injector, $rootScope) {
            httpBackend = $injector.get('$httpBackend');
            mockWidgetFactory = $injector.get('WidgetService');
            rootScope = $rootScope;
        })
    });


    it('should have a factory and get mocked widgets', function(){

        httpBackend.when('GET' ,'http://localhost:8282/widget/v1').respond([{
            "id":0,
            "name":"wacky"
        }]);

        // TODO: figure out how to do functional test here


        mockWidgetFactory.getAll().then( function(result){
            qArray = result.data;
        });


        if(!rootScope.$$phase) {
            rootScope.$apply();
        }

         httpBackend.flush();

        console.log( )

        expect(angular.equals([{
            "id":0,
            "name":"wacky"
        }], qArray)).toBeTruthy();

        expect(qArray.length).toBe(1);

    });

});
