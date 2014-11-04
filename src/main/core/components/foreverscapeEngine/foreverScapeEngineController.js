(function() {
    'use strict';

    var traceVal = [];
    var trace = function( val )
    {
        traceVal.push('<br/>' + val);

        $('#trace').html(traceVal.join(''));

        if(  traceVal.length > 10 )
        {
            traceVal.shift();
        }
    };


    angular.module('FScapeApp.Controllers').controller('foreverScapeEngineController',
        function($scope, BaseController,$location, configModel, tileModel, gridModel, $rootScope, fscapeService, touchService) {

            $scope.touchService = touchService;

            var controller = {

                _hasGrid: false,
                _allowTouch: true,

                zoom:.36,

                offsetX: 0,
                offsetY: -300,
                time: 0,

                offscreenLeft: -1004,
                offscreenRight: 200000,
                offscreenTop: -10000,
                offscreenBottom: 20000,


                hide: false, // change this to true, the entire header will not show up
                location: $location,
                imageTiles:[],
                gridBoxes:[],
                config:null,

                endCoords:{},
                startCoords:{},

                onInit: function( ) {
                    var that = this;

                    touchService.init();

                    $scope.trace = '';

                    this.buildGrid();

                    configModel.getConfig().then( function(){

                        that.config = configModel.data;
                        that.gridBoxes = gridModel.gridBoxes;

                        tileModel.getTiles().then( function(result){
                            that.imageTiles = result;

                        });

                    });

                    $rootScope.$on('fscape.togglePlayback', function(){

                    });

                    $rootScope.$on( 'fscape.setZoom', function(){
                        $('.engine-scale').css('transform', 'scale(' +fscapeService.zoom + ')');
                    });


                    $rootScope.$on( 'fscape.setPosition', function(){

                        $('.engine-position').css({
                            'left': fscapeService.offsetX,
                            'top':fscapeService.offsetY
                        });
                    });

                    $('.preload-junk').html('');
                },


                buildGrid: function()
                {
                    // this used to be generated in ng-repeate
                    // we do this manually to improve performance

                    if( ! this.gridBoxes.length )
                    {
                        return;
                    }


                    for( var i = 0; i <  this.gridBoxes.length ;i++)
                    {

                        var gb = this.gridBoxes[i];
                        var container = document.createElement('div');
                        var domId = 'grid-' + i;

                        container.setAttribute('id',domId );
                        container.setAttribute('class', 'grid-box');
                        container.setAttribute('style', 'left:' + gb.x +'px;top:' + gb.y +'px;'  );

                        var full = document.createElement('img');
                        full.setAttribute('class', 'full');
                        full.setAttribute('id', 'full-' + domId);

                        var thumb = document.createElement('img');
                        thumb.setAttribute('class', 'thumb');
                        thumb.setAttribute('id', 'thumb-' + domId);
                        thumb.setAttribute('src', gb.currentTile.thumbUrl );

                        jQuery( container).append( thumb );
                        jQuery( container).append( full );

                        jQuery("#tile-engine").append(container);
                    }

                    this._hasGrid = true;
                },


                /*
                        For performance reasons, we move the parent div, not each tile individually.
                        Notice how there is only a single loop in render, and that it does not have
                        to even touch all tile objects, only the grid objects that get associated
                        based on index. We never have to iterate through all images except when
                        querying for waypoints.
                 */
                render: function()
                {
                    var that = this;
                    that.time+= 1;

                    if( that.config === null)
                        return;

                    if( ! this._hasGrid )
                    {
                        this.buildGrid();
                        return;
                    }

                    if( fscapeService.isPlaying )
                    {
                        fscapeService.offsetX += 10;
                    }


                    var loadBoundaryOffsetX =  (this.config.tileWidth * 4 * fscapeService.zoom );
                    this.offscreenLeft = 100 - loadBoundaryOffsetX;
                    this.offscreenRight = (16 * this.config.tileWidth * fscapeService.zoom) - loadBoundaryOffsetX;

                    var loadBoundaryOffsetY =  (this.config.tileHeight * 4 * fscapeService.zoom );
                    this.offscreenTop = 50 - loadBoundaryOffsetY;
                    this.offscreenBottom = (fscapeService.zoom * 11 * this.config.tileHeight )- loadBoundaryOffsetY;

                    for( var i = 0; i < this.gridBoxes.length;i++)
                    {
                        var gb = that.gridBoxes[i];

                        if(!gb.element )
                        {
                            gb.element = $('#' + gb.domId );
                            gb.thumbElement = $('#thumb-' + gb.domId );
                            gb.fullElement = $('#full-' + gb.domId );
                        }

                        var offset = gb.element.offset();

                        gb.screenX = parseInt( offset.left, 10 );
                        gb.screenY = parseInt( offset.top, 10 ) ;

                        this.setIsOffscreen(gb);

                        this.loadFullResTiles(gb);

                    }

                },

                // long function, but a lot is needed to see if it should load or not
                setIsOffscreen: function( gb)
                {
                    var isOffscreenLeft = gb.screenX < this.offscreenLeft && fscapeService.dx < 0;
                    var isOffscreenRight = gb.screenX >= this.offscreenRight && fscapeService.dx > 0;

                    if( isOffscreenLeft)
                    {
                        gb.col += 15;
                        gb.currentTileId += 30;
                        gb.row += 3;

                    } else if( isOffscreenRight )
                    {
                        gb.col -= 15;
                        gb.currentTileId -= 30;
                        gb.row -= 3;
                    }

                    var isOffscreenTop = gb.screenY < this.offscreenTop;
                    var isOffscreenBottom = gb.screenY > this.offscreenBottom;

                    // grid has moved above the top or bottom threshold, increment the image index
                    if( isOffscreenTop && fscapeService.dy < 0 )
                    {
                        gb.currentTileId += 50;
                        gb.row += 10;

                    } else if ( isOffscreenBottom && fscapeService.dy > 0)
                    {
                        gb.currentTileId -= 50;
                        gb.row -= 10;
                    }

                    // grid has moved left or right of the loading boundary, increment the image index
                    if( isOffscreenLeft || isOffscreenRight ||
                        isOffscreenTop || isOffscreenBottom )
                    {
                        gb.x = (gb.col * gb.width);
                        gb.y = (gb.row * gb.height);

                        if( gb.currentTileId < 0 )
                        {
                            gb.currentTileId = this.config.totalPages + gb.currentTileId;
                        } else if( gb.currentTileId >= this.config.totalPages )
                        {
                            gb.currentTileId = gb.currentTileId - this.config.totalPages;
                        }
                        gb.currentTile = tileModel.tiles[gb.currentTileId];

                        gb.element.css({ 'left': gb.x });
                        gb.element.css({ 'top': gb.y });

                        if( gb.currentTile  ){
                            if( gb.thumbElement.attr('src') != gb.currentTile.thumbUrl);
                            {
                                gb.thumbElement.attr('src', gb.currentTile.thumbUrl);
                            }
                        }
                    }

                }, 


                loadFullResTiles: function(gb){



                    // see if the image is in bounds of the screen and show the high resolution if zoomed in enough
                    if( fscapeService.zoom > .36 && ! this._dragging && ! touchService._flickingX && ! touchService._flickingY )
                    {
                        var isOnLeft = gb.screenX  > - ( this.config.tileWidth * fscapeService.zoom);
                        var isOnRight = gb.screenX < window.innerWidth;
                        var isOnTop = gb.screenY > - ( this.config.tileHeight * fscapeService.zoom) ;
                        var isOnBottom = gb.screenY < window.innerHeight + ( this.config.tileHeight *fscapeService.zoom) ;

                        if( (isOnLeft && isOnRight) && isOnTop && isOnBottom && ! gb.isOnScreen )
                        {
                            if( gb.fullElement.attr('src') )
                            {
                                if( gb.currentTile && gb.fullElement.attr('src').toString() != gb.currentTile.fullUrl.toString());
                                {
                                    gb.isOnScreen = true;
                                    gb.fullElement.attr('src',gb.currentTile.fullUrl);
                                }
                            }

                        }

                    } else {
                        if( gb.currentTile){
                            gb.isOnScreen = false;
                            gb.fullElement.attr('src','main/resources/img/blank.gif');
                        }
                    }
                }

            };


            (function animloop(){
                window.requestAnimFrame(animloop);
                controller.render();
            })();

            angular.extend(controller, new BaseController($scope ));

            controller.init();

            return controller;
        }
    );


    //request animation frame

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 30);
            };
    })();

    //polyfill for reqAnimationFrame though it prolly won't perform well at all on the system anyway
    (function() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());


}());