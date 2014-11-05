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


    angular.module('FScapeApp.Services').service('touchService',
        function($rootScope,$window, fscapeService,$timeout){

            var touchService = {

                scale:1,

                zoom:.5,


                offsetX: -900,
                offsetY: -900,


                hasInit: false,

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
                _preventMove:false,
                flickTweenX:null,
                flickTweenY: null,
                zoomTween:null,
                prevPinchDist: 0,



                canIntro: true,


                init: function(){
                    var that = this;

                    if( that.hasInit )
                    {
                        return;
                    }

                    TweenMax.to(that, 1,
                    {
                        zoom:.36,
                        onUpdate: function(){
                            fscapeService.setZoom( that.zoom );
                        }
                    });

                    that.hasInit = true;

                    $(document).mousewheel(function(e) {
                        e.originalEvent.preventDefault();
                        if(e.deltaY  > 0) {
                            that.zoomIn();
                        } else{
                            that.zoomOut();
                        }
                    });

                    angular.element( $window).bind( 'resize', this.onResize);
                    angular.element( $window).bind('orientationchange', this.onResize);

                    fscapeService.setOffsetX(that.offsetX );
                    fscapeService.setOffsetY(that.offsetY );


                    $timeout( function(){
                        if( that.canIntro )
                        {
                            fscapeService.setOffsetX(that.offsetX );
                            fscapeService.setOffsetY(that.offsetY );
                            TweenMax.to( that,3,
                                {
                                    offsetX:-2200,
                                    offsetY:-1200,
                                    onUpdate: function(){
                                        fscapeService.setOffsetX(that.offsetX );
                                        fscapeService.setOffsetY(that.offsetY );
                                    }
                                });
                        }
                    }, 0 , false);



                    this.onResize();
                    this.blockDefaults();

                },

                blockDefaults: function(){

                    $(document).bind('gesturestart', function(e) {
                        e.originalEvent.preventDefault();
                    }, false);

                    $(document).bind('gestureend', function(e) {
                        e.originalEvent.preventDefault();
                    }, false);

                    $(document).bind('touchstart', function(event) {
                        event.preventDefault();
                    });

                    $(document).bind('touchmove', function(event) {
                        event.preventDefault();
                    });

                    $(document).bind('touchend', function(event) {
                        event.preventDefault();
                    });

                    $(document).bind('touchcancel', function(event) {
                        event.preventDefault();
                    });
                },

                onResize: function()
                {
                    fscapeService.zoomMin = ((window.innerWidth -200 ) / 6000) + .15;
                },


                /* touch, drag flick */


                touchGesture: function(e)
                {
                    this.down(e.gesture.center);
                },

                mouseDown: function($event)
                {
                    $event.preventDefault();
                },

                down:function(e)
                {
                    this.mouseDownX = e.pageX;
                    this.mouseDownY = e.pageY;
                    this.mouseX = e.pageX;
                    this.mouseY = e.pageY;

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
                        //this.offsetX = parseInt( $('.engine-position').css('left'), 10 );
                        this.flickTweenX.kill();
                    }
                    if( this.flickTweenY)
                    {
                        //this.offsetY = parseInt( $('.engine-position').css('top'), 10 );
                        this.flickTweenY.kill();
                    }

                    fscapeService.setOffsetX(this.offsetX);
                    fscapeService.setOffsetY(this.offsetY);

                },

                handleDrag: function( $event )
                {
                    this.mouseX = $event.gesture.center.pageX;
                    this.mouseY = $event.gesture.center.pageY;

                    this.move();
                },

                mouseMove: function( $event )
                {
                    $event.preventDefault();
                },

                move: function()
                {
                    if( this._preventMove === true)
                    {
                        return;
                    }

                    this.endDragTime = new Date();


                    this.dx = this.mouseX  - this.mousePreviousX;
                    this.dy = this.mouseY  - this.mousePreviousY;

                    if( this._mouseDown && ! this._flickingX  )
                    {
                        this._dragging = true;
                        this.offsetX += this.dx * ( 3 * ( fscapeService.zoomMax +.1  - touchService.zoom) );

                        this.setPosition();
                    }
                    if( this._mouseDown && ! this._flickingY  )
                    {
                        this._dragging = true;
                        this.offsetY += this.dy* ( 3 *  ( fscapeService.zoomMax +.1  - touchService.zoom) );

                        this.setPosition();
                    }

                    fscapeService.setDx( this.dx );
                    fscapeService.setDy( this.dy )

                    // todo: refactor so service keeps track of offset
                    this.mousePreviousX = this.mouseX;
                    this.mousePreviousY = this.mouseY;
                },

                // working on abstracting this out, yay!!
                setPosition: function(){

                    fscapeService.setOffsetX(this.offsetX);
                    fscapeService.setOffsetY(this.offsetY);
                },

                mouseUp: function($event)
                {
                    $event.preventDefault();
                    this.up();
                },

                up: function()
                {
                    this.endDragTime = new Date();
                    this._mouseDown = false;
                    this._dragging = false;
                    this._preventMove = false;

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
                        var targetX = that.offsetX + 3000 * velX;
                        this.flickTweenX = TweenMax.to( that, 1,
                            {
                                offsetX:targetX,
                                onUpdate: function(){
                                    fscapeService.setOffsetX( that.offsetX)
                                },
                                onComplete: function(){
                                    that._flickingX = false;
                                }
                            });
                    }

                    if( ! this._flickingY && Math.abs( velX ) > .15 || Math.abs( velY ) > .15 )
                    {
                        this._flickingY= true;
                        var targetY = that.offsetY +  3000 * velY;
                        this.flickTweenY = TweenMax.to( that, 1,
                            {
                                offsetY: targetY,
                                onUpdate: function(){
                                    fscapeService.setOffsetY( that.offsetY)
                                },
                                onComplete: function(){
                                    that._flickingY = false;
                                }
                            });
                    }
                },







                /* pinch and zoom */


                handlePinch: function(e)
                {
                    var pinchScale = e.gesture.scale;

                    this._preventMove = true;

                    if(pinchScale > 1)
                    {
                        this.zoomIn(1);
                    } else {
                        this.zoomOut(1);
                    }
                },

                zoomIn: function( multiplier)
                {
                    if( ! multiplier )
                    {
                        multiplier = 2;
                    }
                    fscapeService.setZoom(this.zoom);
                    if( this.zoom > fscapeService.zoomMax)
                        return;

                    this.zoom += .025 * multiplier;

                },

                zoomOut: function(multiplier)
                {
                    if( ! multiplier )
                    {
                        multiplier = 2;
                    }
                    fscapeService.setZoom(this.zoom);
                    if( this.zoom <= fscapeService.zoomMin)
                        return;
                    this.zoom -= .025 * multiplier;
                }
            }

            touchService.init();

            return touchService;

        });

}());