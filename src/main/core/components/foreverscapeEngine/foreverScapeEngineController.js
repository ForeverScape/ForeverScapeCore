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
        function($scope, BaseController,$location, configModel, tileModel, gridModel) {

            var controller = {

                _hasGrid: false,
                _allowTouch: true,

                zoom:.36,
                zoomMax: 1.6, //these might get bumped up if window size is really big
                zoomMin:.5,   //these might get bumped up if window size is really big

                offsetX: 0,
                offsetY: -350,
                time: 0,

                canIntro: true,

                //drag flick
                mouseDownX: null,
                mouseDownY: null,
                mouseX: null,
                mouseY:null,
                mousePreviousX:0,
                mousePreviousY:0,
                dx: 0,
                dy: 0,
                startDragTime: new Date(),
                endDragTime: new Date(),
                _mouseDown: false,
                _dragging: false,
                _flickingX: false,
                _flickingY: false,
                _scaling:false,
                flickTweenX:null,
                flickTweenY: null,
                zoomTween:null,
                prevPinchDist: 0,

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

                is_touch_device: false,


                onInit: function( ) {
                    var that = this;

                    $scope.trace = '';

                    this.buildGrid();
                    this.setupTouchEvents();

                    setTimeout( function(){
                        if( that.canIntro )
                        {
                            that.offsetX -= 900;;
                            TweenMax.to( $('.engine-position'),3,
                            {
                                css:{left:that.offsetX, top:that.offsetY}
                            });
                        }
                    }, 2500 );

                },

                setupTouchEvents: function(){

                    var that = this;

                    that.is_touch_device = 'ontouchstart' in document.documentElement || 'ontouchstart' in window;
                    $(document).bind('gesturestart', function(e) {
                        e.originalEvent.preventDefault();
                    }, false);

                    $(document).bind('gestureend', function(e) {
                        e.originalEvent.preventDefault();
                    }, false);

                    $(document).bind('touchstart', function(event) {

                        event.preventDefault();
                        event.originalEvent.preventDefault();

                        if( event.originalEvent.touches.length === 2 ||
                            event.originalEvent.targetTouches.length ===2 ) {

                            that._scaling = true;
                            that.pinchStart(event);
                            return;
                        }

                        if( !that._allowTouch )
                        {
                            return;
                        }
                        that._allowTouch = false;

                        that.mouseDownX = event.originalEvent.targetTouches[0].pageX || event.originalEvent.changedTouches[0].pageX || event.originalEvent.touches[0].pageX ;
                        that.mouseDownY = event.originalEvent.targetTouches[0].pageY || event.originalEvent.changedTouches[0].pageY || event.originalEvent.touches[0].pageY ;

                        that.mouseX  = event.originalEvent.targetTouches[0].pageX || event.originalEvent.changedTouches[0].pageX || event.originalEvent.touches[0].pageX ;
                        that.mouseY  = event.originalEvent.targetTouches[0].pageY || event.originalEvent.changedTouches[0].pageY || event.originalEvent.touches[0].pageY ;

                        that.down();
                    });

                    $(document).bind('touchmove', function(event) {

                        event.preventDefault();
                        event.originalEvent.preventDefault();

                        if(that._scaling) {
                            that.pinchMove(event);
                            return;
                        }


                        that.mouseX  = event.originalEvent.targetTouches[0].pageX || event.originalEvent.changedTouches[0].pageX || event.originalEvent.touches[0].pageX ;
                        that.mouseY  = event.originalEvent.targetTouches[0].pageY || event.originalEvent.changedTouches[0].pageY || event.originalEvent.touches[0].pageY ;

                        that.move();
                    });

                    $(document).bind('touchend', function(event) {

                        event.preventDefault();
                        event.originalEvent.preventDefault();


                        window.clearTimeout( that.touchTimeout );
                        that.touchTimeout = window.setTimeout( function(){
                            that._allowTouch = true;
                        }, 300 );

                        if(that._scaling) {
                            that.pinchEnd(event);
                            that._scaling = false;
                            return;
                        }

                        that.up();
                    });

                    $(document).bind('touchcancel', function(event) {

                        event.preventDefault();
                        event.originalEvent.preventDefault();
                    });

                    configModel.getConfig().then( function(){

                        trace('gotConfig');

                        that.config = configModel.data;
                        that.gridBoxes = gridModel.gridBoxes;

                        tileModel.getTiles().then( function(result){
                            that.imageTiles = result;
                            trace('got tiles');
                            that.setZoomTarget();
                        });

                    });

                    $(document).mousewheel(function(e) {

                        e.originalEvent.preventDefault();
                        if(e.deltaY  > 0) {
                            that.zoomIn();
                        } else{
                            that.zoomOut();
                        }
                    });

                },


                pinchStart: function(e)
                {
                    this.startDistance = this.getPinchDistance(e);
                },
                pinchMove: function(e)
                {


                    var dist = this.getPinchDistance(e);
                    //var difference = this.startDistance - difference;

                    if( dist - this.prevPinchDist > 0)
                    {
                        this.zoomIn();
                        this.setZoomTarget();

                    } else {
                        this.zoomOut();
                    }

                    this.prevPinchDist = dist;

                },
                pinchEnd: function(e)
                {
                    trace("pinchEnd");
                },

                getPinchDistance: function(e)
                {
                    var dist = 0;
                    if( e.originalEvent.touches[0])
                    {
                        dist = Math.sqrt(
                                (e.originalEvent.touches[0].pageX-e.originalEvent.touches[1].pageX) * (e.originalEvent.touches[0].pageX-e.originalEvent.touches[1].pageX) +
                                (e.originalEvent.touches[0].pageY-e.originalEvent.touches[1].pageY) * (e.originalEvent.touches[0].pageY-e.originalEvent.touches[1].pageY));

                    } else  if( e.originalEvent.changedTouches[0])
                    {
                        dist = Math.sqrt(
                                (e.originalEvent.changedTouches[0].pageX-e.originalEvent.changedTouches[1].pageX) * (e.originalEvent.changedTouches[0].pageX-e.originalEvent.changedTouches[1].pageX) +
                                (e.originalEvent.changedTouches[0].pageY-e.originalEvent.changedTouches[1].pageY) * (e.originalEvent.changedTouches[0].pageY-e.originalEvent.changedTouches[1].pageY));

                    }
                    return dist;
                },

                mouseDown: function($event)
                {
                    $event.preventDefault();

                    if( this.is_touch_device )
                        return;

                    trace('mouseDown');

                    this.mouseDownX = $event.pageX;
                    this.mouseDownY = $event.pageY;
                    this.mouseX = $event.pageX;
                    this.mouseY = $event.pageY;

                    this.down();
                },

                down:function()
                {
                    this.canIntro = false;

                    this.startDragTime = new Date();

                    this.mousePreviousX = this.mouseX;
                    this.mousePreviousY = this.mouseY;


                    this._mouseDown = true;
                    this._flickingX = false;
                    this._flickingY = false;

                    this.dx = 0;
                    this.dy = 0;

                    if( this.flickTweenX )
                    {
                        this.offsetX = parseInt( $('.engine-position').css('left'), 10 );
                        this.flickTweenX.kill();
                    }
                    if( this.flickTweenY)
                    {
                        this.offsetY = parseInt( $('.engine-position').css('top'), 10 );
                        this.flickTweenY.kill();
                    }

                },

                mouseMove: function( $event )
                {
                    $event.preventDefault();

                    if( this.is_touch_device )
                        return;

                    this.mouseX = $event.pageX;
                    this.mouseY = $event.pageY;

                    this.move();
                },

                move: function()
                {
                    this.endDragTime = new Date();


                    this.dx = this.mouseX  - this.mousePreviousX;
                    this.dy = this.mouseY  - this.mousePreviousY;

                    if( this._mouseDown && ! this._flickingX  )
                    {
                        this._dragging = true;
                        this.offsetX += this.dx * ( 3 * ( this.zoomMax +.1  - this.zoom) );

                        $('.engine-position').css({ 'left': this.offsetX });
                    }
                    if( this._mouseDown && ! this._flickingY  )
                    {
                        this._dragging = true;
                        this.offsetY += this.dy* ( 3 *  ( this.zoomMax +.1  - this.zoom) );

                        $('.engine-position').css({ 'top': this.offsetY });
                    }


                    this.mousePreviousX = this.mouseX;
                    this.mousePreviousY = this.mouseY;
                },

                mouseUp: function($event)
                {
                    $event.preventDefault();

                    if( this.is_touch_device )
                        return;

                    trace('mouseUp');

                    this.up();

                },

                up: function()
                {
                    this.endDragTime = new Date();
                    this._mouseDown = false;
                    this._dragging = false;


                    this.flick();

                },

                flick: function()
                {

                    var that = this;

                    var dTime  = ( this.endDragTime - this.startDragTime);

                    if( dTime === 0 )
                        return;

                    var velX = this.dx / dTime;
                    var velY = this.dy / dTime;

                    //flick
                    if( ! this._flickingX && Math.abs( velX ) > .15 || Math.abs( velY ) > .15)
                    {
                        trace('flickX start');
                        this._flickingX = true;
                        this.offsetX +=  3000 * velX;
                        this.flickTweenX = TweenMax.to( $('.engine-position'), 1,
                            {
                                css:{left:that.offsetX},
                                onComplete: function(){
                                    that._flickingX = false;
                                    $scope.$apply();
                                }
                            });
                    }
                    if( ! this._flickingY &&Math.abs( velX ) > .15 || Math.abs( velY ) > .15 )
                    {
                        trace('flickY start');
                        this._flickingY= true;
                        this.offsetY +=  3000 * velY;
                        this.flickTweenY = TweenMax.to( $('.engine-position'), 1,
                            {
                                css:{top:that.offsetY},
                                onComplete: function(){
                                    that._flickingY = false;
                                    $scope.$apply();
                                }
                            });
                    }
                },





                zoomIn: function( multiplier)
                {
                    if( ! multiplier )
                    {
                        multiplier = 1;
                    }

                    if( this.zoom > this.zoomMax)
                        return;

                    this.zoom += .025* multiplier;
                    this.setZoomTarget();
                },
                zoomOut: function(multiplier)
                {
                    if( ! multiplier )
                    {
                        multiplier = 1;
                    }

                    if( this.zoom <= .26)
                        return;
                    this.zoom -= .025 * multiplier;
                    this.setZoomTarget();
                },

                setZoomTarget: function( newZoom){
                    var that = this;

                    if( newZoom )
                    {
                        that.zoom = newZoom;
                    }

                    if( this.zoomTween )
                    {
                        this.zoomTween.kill();
                    }

                    that.zoomTween = TweenMax.to( $('.engine-scale'),0,
                        {
                            css:{scale:that.zoom}
                        });
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

                    var loadBoundaryOffsetX =  (this.config.tileWidth * 4 * this.zoom );
                    this.offscreenLeft = 100 - loadBoundaryOffsetX;
                    this.offscreenRight = (16 * this.config.tileWidth * this.zoom) - loadBoundaryOffsetX;

                    var loadBoundaryOffsetY =  (this.config.tileHeight * 4 * this.zoom );
                    this.offscreenTop = 50 - loadBoundaryOffsetY;
                    this.offscreenBottom = (this.zoom * 11 * this.config.tileHeight )- loadBoundaryOffsetY;

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

                    var isOffscreenLeft = gb.screenX < this.offscreenLeft && this.dx < 0;
                    var isOffscreenRight = gb.screenX >= this.offscreenRight && this.dx > 0;

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
                    if( isOffscreenTop && this.dy < 0 )
                    {

                        gb.currentTileId += 50;
                        gb.row += 10;

                    } else if ( isOffscreenBottom && this.dy > 0)
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
                    if( this.zoom > .36 && ! this._dragging && ! this._flickingX && ! this._flickingY )
                    {
                        var isOnLeft = gb.screenX  > - ( this.config.tileWidth * this.zoom);
                        var isOnRight = gb.screenX < window.innerWidth;
                        var isOnTop = gb.screenY > - ( this.config.tileHeight * this.zoom) ;
                        var isOnBottom = gb.screenY < window.innerHeight + ( this.config.tileHeight * this.zoom) ;

                        if( (isOnLeft && isOnRight) && isOnTop && isOnBottom && ! gb.isOnScreen )
                        {
                            if( gb.currentTile && gb.fullElement.attr('src').toString() != gb.currentTile.fullUrl.toString());
                            {
                                ;                                   gb.isOnScreen = true;
                                gb.fullElement.attr('src',gb.currentTile.fullUrl);
                            }
                        }

                    } else {
                        if( gb.currentTile){
                            gb.isOnScreen = false;
                            gb.fullElement.attr('src','main/resources/img/blank.gif');
                        }
                    }
                },

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