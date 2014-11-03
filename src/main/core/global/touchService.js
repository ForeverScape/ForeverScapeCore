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
        function($rootScope,$window){

            var touchService = {

                scale:1,

                zoom:.5,
                zoomMax: 1.6, //these might get bumped up if window size is really big
                zoomMin:.45,   //these might get bumped up if window size is really big

                positionX: 0,
                positionY: 0,


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
                flickTweenX:null,
                flickTweenY: null,
                zoomTween:null,
                prevPinchDist: 0,


                init: function(){
                    var that = this;

                    if( that.hasInit )
                    {
                        return;
                    }

                    //set initial zoom
                    setTimeout( function(){

                    }, 1000 );

                    TweenMax.to(that, 1,
                    {
                        zoom:.36,
                        onUpdate: function(){
                            $rootScope.$broadcast('setZoom');
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

                    this.onResize();

                },

                onResize: function()
                {
                    this.zoomMin = (window.innerWidth / 6000) + .2;
                },

                handlePinch: function(e)
                {
                    var pinchScale = e.gesture.scale;
                    var range = this.zoomMax - this.zoomMin;

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
                    this.setZoomTarget();
                    if( this.zoom > this.zoomMax)
                        return;

                    this.zoom += .025 * multiplier;

                },

                zoomOut: function(multiplier)
                {
                    if( ! multiplier )
                    {
                        multiplier = 2;
                    }
                    this.setZoomTarget();
                    if( this.zoom <= this.zoomMin)
                        return;
                    this.zoom -= .025 * multiplier;

                },


                setZoomTarget: function(){
                    $rootScope.$broadcast('setZoom');
                }


            }

            touchService.init();

            return touchService;

        });

}());