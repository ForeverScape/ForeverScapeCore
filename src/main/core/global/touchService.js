(function() {
    'use strict';

    angular.module('FScapeApp.Services').service('touchService',
        function($rootScope){

            var touchService = {


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

                    $rootScope.$broadcast('mouseDown');

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
                }
            }

            touchService.setupTouchEvents();

            return touchService;

        });

}());