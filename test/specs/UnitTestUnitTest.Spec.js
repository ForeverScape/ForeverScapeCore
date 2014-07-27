describe('UnitTestUnitTest', function() {
    'use strict';

    beforeEach(module('ngResource', function($provide) {
        //module('AtOnceApp');
        $provide.value('fooVal', 5);
    }));

    beforeEach(module('ngMock', function() {

    }));

    it('should work with jasmine', function() {
        expect(true).toEqual(true);
    });

    it('should be able to inject dependencies such as $resource', inject(function($resource, fooVal) {
        expect($resource).toBeDefined();
        expect(fooVal).toEqual(5);
    }));


    //compiling directives etc. yuck
    it('should be able to compile angular expressions', inject(function($rootScope, $compile) {
        $rootScope.sum = 4;

        var expression = '<p>2 + 2 == {{ sum }}</p>';
        var element = $compile(expression)($rootScope);
        expect(element.html()).not.toContain('2 + 2 == 4');
        $rootScope.$digest();
        expect(element.html()).toContain('2 + 2 == 4');
    }));

});
