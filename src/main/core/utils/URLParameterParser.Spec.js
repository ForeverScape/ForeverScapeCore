describe('URLParameterParser Test', function() {
    'use strict';

    var parser;
    beforeEach(angular.mock.module('FScapeApp.Services'));

    beforeEach(inject(function(URLParameterParser) {
        parser = URLParameterParser;
    }));

    it('should be able to build a path using a map', function() {
        expect(
            parser.buildPath({
            'what': 'does',
            'the': 'fox',
        })).toBe('what/does/the/fox');
    });

    it('should be able to build a map using a path', function() {
        var map = parser.getMap('foo/bar');
        expect(
            parser.buildPath(map)
        ).toBe('foo/bar');
    });

    it('should build an empty map if given an empty string', function() {
        expect(
            parser.getMap()
        ).toEqual({});
    });

});