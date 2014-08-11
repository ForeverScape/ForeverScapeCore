

    angular.module('FScapeApp.Controllers').controller('foreverScapeEngineController',
        function($scope, BaseController,$location, configModel, tileModel, gridModel) {

            var controller = {

                zoom:.5,
                offsetX: 0,
                offsetY: 0,
                time: 0,


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
                flickTweenX:null,
                flickTweenY: null,

                offscreenLeft: -1004,
                offscreenRight: 200000,
                offscreenTop: -10000,
                offscreenBottom: 20000,

                farthestLeft: 90000,
                farthestRight: 0,

                tx: 0,

                hide: false, // change this to true, the entire header will not show up
                location: $location,
                imageTiles:[],
                gridBoxes:[],
                config:null,

                onInit: function( ) {
                    var that = this;

                    this.setZoomTarget();

                    configModel.getConfig().then( function(){

                        that.config = configModel.data;

                        that.gridBoxes = gridModel.gridBoxes;


                        tileModel.getTiles().then( function(result){
                            that.imageTiles = result;
                        });

                    });

                    $('.engine-frame').bind('mousewheel', function(e){

                        e.originalEvent.preventDefault();

                        if(e.originalEvent.wheelDelta  > 0) {
                            that.zoomIn();
                        } else{
                            that.zoomOut();
                        }
                    });



                },

                mouseDown: function($event)
                {
                    $event.preventDefault();

                    this.startDragTime = new Date();

                    this.mouseDownX = $event.pageX;
                    this.mouseDownY = $event.pageY;
                    this.mouseX = $event.pageX;
                    this.mouseY = $event.pageY;

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

                mouseUp: function($event)
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
                    if( ! this._flickingX && Math.abs( velX ) > .25 )
                    {



                        this._flickingX = true;
                        this.offsetX +=  3000 * velX;
                        this.flickTweenX = TweenMax.to( $('.engine-position'), 1,
                            {
                                css:{left:this.offsetX},
                                onComplete: function(){
                                    that._flickingX = false;
                                }
                            });
                    }
                    if( ! this._flickingY && Math.abs( velY ) > .25 )
                    {

                        this._flickingY= true;
                        this.offsetY +=  3000 * velY;
                        this.flickTweenY = TweenMax.to( $('.engine-position'), 1,
                            {
                                css:{top:this.offsetY},
                                onComplete: function(){
                                    that._flickingY = false;
                                }
                            });
                    }
                },


                mouseMove: function($event)
                {
                    this.endDragTime = new Date();

                    this.mouseX = $event.pageX;
                    this.mouseY = $event.pageY;

                    this.dx = $event.pageX - this.mousePreviousX;
                    this.dy = $event.pageY - this.mousePreviousY;

                    if( this._mouseDown && ! this._flickingX  )
                    {
                        this._dragging = true;
                        this.offsetX += this.dx;

                        $('.engine-position').css({ 'left': this.offsetX });
                    }
                    if( this._mouseDown && ! this._flickingY  )
                    {
                        this._dragging = true;
                        this.offsetY += this.dy;

                        $('.engine-position').css({ 'top': this.offsetY });
                    }

                    if( this._dragging && this.mousePreviousX )
                    {
                        //this.flick();
                    }


                    this.mousePreviousX = this.mouseX;
                    this.mousePreviousY = this.mouseY;
                },


                zoomIn: function( val)
                {
                    if( this.zoom > 1.5)
                        return;

                    this.zoom += .015;
                    this.setZoomTarget();
                },
                zoomOut: function()
                {
                    if( this.zoom <= .1)
                        return;
                    this.zoom -= .015;
                    this.setZoomTarget();
                },

                setZoomTarget: function(){

                    var that = this;
                    TweenMax.to( $('.engine-scale'), 1,
                        {
                            css:{scale:that.zoom}
                        });
                },

                render: function()
                {
                    var that = this;
                    that.time+= .015;

                    if( that.config === null)
                        return;



                    var loadBoundaryOffsetX =  (this.config.tileWidth * 4 * this.zoom );
                    this.offscreenLeft = 100 - loadBoundaryOffsetX;
                    this.offscreenRight = (16 * this.config.tileWidth * this.zoom) - loadBoundaryOffsetX;

                    var loadBoundaryOffsetY =  (this.config.tileHeight * 4 * this.zoom );
                    this.offscreenTop = 50 - loadBoundaryOffsetY;
                    this.offscreenBottom = (this.zoom * 11 * this.config.tileHeight )- loadBoundaryOffsetY;

                    for( var i = 0; i < this.gridBoxes.length;i++)
                    {
                        var gb = that.gridBoxes[i];

                        var element = $('#' + gb.domId);
                        var offset = element.offset();

                        gb.screenX = parseInt( offset.left, 10 );
                        gb.screenY = parseInt( offset.top, 10 ) ;

                        element.find('.grid-info').css({ 'color': gb.color });

                        var isOffscreenLeft = gb.screenX < this.offscreenLeft && this.dx < 0;
                        var isOffscreenRight = gb.screenX >= this.offscreenRight && this.dx > 0;

                        if( !  gb.thumbElement )
                        {
                            gb.thumbElement = $("#thumb-" + gb.domId );
                        }

                        if( !  gb.fullElement )
                        {
                            gb.fullElement = $("#full-" + gb.domId );
                        }


                        if( isOffscreenLeft)
                        {
                            gb.col += 15;
                            gb.currentTileId += 30;
                            gb.row += 3;

                        } else if(  isOffscreenRight )
                        {
                            gb.col -= 15;
                            gb.currentTileId -= 30;
                            gb.row -= 3;
                        }


                        var isOffscreenTop = gb.screenY < this.offscreenTop;
                        var isOffscreenBottom = gb.screenY > this.offscreenBottom;


                        if( isOffscreenTop && this.dy < 0 )
                        {

                            gb.currentTileId += 50;
                            gb.row += 10;

                        } else if ( isOffscreenBottom && this.dy > 0)
                        {
                            gb.currentTileId -= 50;
                            gb.row -= 10;
                        }

                        if( isOffscreenLeft || isOffscreenRight ||
                            isOffscreenTop || isOffscreenBottom )
                        {
                            gb.x = (gb.col * gb.width);
                            gb.y = (gb.row * gb.height);

                            if( gb.currentTileId < 0 )
                            {
                                gb.currentTileId = this.config.totalPages + gb.currentTileId;
                            } else if( gb.currentTileId > this.config.totalPages )
                            {
                                gb.currentTileId = gb.currentTileId - this.config.totalPages;
                            }
                            gb.currentTile = tileModel.tiles[gb.currentTileId ];

                            element.css({ 'left': gb.x });
                            element.css({ 'top': gb.y });


                            if( gb.currentTile){
                                if( gb.thumbElement.attr('src') != gb.currentTile.thumbUrl);
                                {
                                    gb.currentTile.isLoading = true;
                                    gb.thumbElement.attr("src",gb.currentTile.thumbUrl);
                                }
                            }

                        }


                        if( ! this._dragging && ! this._flickingX && ! this._flickingY )
                        {

                            console.log("do it")

                            var full  = $("#full-" + gb.domId );

                            var isOnLeft = gb.screenX  > - ( this.config.tileWidth * this.zoom);
                            var isOnRight = gb.screenX < window.innerWidth;
                            var isOnTop = gb.screenY > - ( this.config.tileHeight * this.zoom) ;
                            var isOnBottom = gb.screenY < window.innerHeight;

                            if( (isOnLeft && isOnRight) && isOnTop && isOnBottom)
                            {

                                if( gb.currentTile){

                                   // console.log("onscreen " + gb.currentTile.id)

                                    gb.isOnScreen = true;

                                    if( gb.fullElement.attr('src') != gb.currentTile.fullUrl);
                                    {
                                        full.attr("src",gb.currentTile.fullUrl);
                                    }
                                }

                            } else {

                                if( gb.currentTile){

                                    gb.isOnScren = false;

                                    if( gb.fullElement.attr('src') )
                                        gb.fullElement.attr("src","");

                                }

                            }

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
