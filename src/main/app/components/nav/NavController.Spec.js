describe('NavController', function() {

        var scope, ctrl, rootScope;


        beforeEach(module('ngResource', function($provide) {
            $provide.value('fooVal', 5);
        }));


    beforeEach(module('FScapeApp.Controllers'));
    beforeEach(module('FScapeApp.Services'));

        beforeEach(inject(function($controller, $location, $rootScope) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            ctrl = $controller('NavController', { $scope: scope, $location: $location, $controller: $controller  });
        }));

        it('should be able to find the NavController',  function(){
            scope = rootScope.$new();
            expect(ctrl).toBeDefined();
            expect(ctrl).toBeTruthy()
        });

        it('should have a positive instance number',function(){
            scope = rootScope.$new();
            expect( ctrl.instanceNumber).toBeTruthy();
        });

        it('should return a css class based on location path', function(){
            expect(ctrl.navClass('product-search')).toBe('');
            ctrl.location.path('/product-search');
            expect(ctrl.navClass('product-search')).toBe(' header-active');
        });

        // now let's mock a $resource




    });
