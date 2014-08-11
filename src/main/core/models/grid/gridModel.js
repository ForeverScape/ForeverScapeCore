angular.module('FScapeApp.Models').factory('gridModel',
    function(configModel, tileModel){

    var defaults =  [];

    var model = {

        gridBoxes:[],
        init: function () {

            var that = this;

            configModel.getConfig().then(function () {


                tileModel.getTiles().then( function(){




                // this should only generate a grid that pulls from the data well based on calculations
                for (var i = 0; i < 150; i++) {

                    var color = 0xff0000;
                    //offsetY =

                    var rowOffset = 0;
                    var colOffset = 0;
                    var tileOffset = 0;

                    if( i >= 50 && i < 100)
                    {
                        rowOffset = -9;
                        colOffset = 5;
                        color=0x00ff00;
                        tileOffset = -40;
                    }
                    if( i >= 100 )
                    {
                        rowOffset = - 18;
                        colOffset = 10;
                        color=0x0000ff;
                        tileOffset = -80;
                    }

                    that.gridBoxes.push(
                        {
                            id: i,
                            domId: 'grid-' + i,
                            transientId: i,

                            isOnScreen: false,

                            row: Math.floor( i / 5) + rowOffset,// - offsetY,
                            col: (i % 5) + colOffset ,

                            width:configModel.data.tileWidth,
                            height: configModel.data.tileHeight,
                            currentTile: tileModel.tiles[i + tileOffset ],
                            currentTileId: i + tileOffset,

                            x: 0,
                            y: 0,
                            color: color

                        });

                    }


                    for( var i = 0; i < that.gridBoxes.length;i++)
                    {
                        var gb = that.gridBoxes[i];

                        gb.x = (gb.col* gb.width);
                        gb.y = gb.row * gb.height;

                        gb.thumbSrc = tileModel.tiles[i].thumbUrl;

                    }
                })

            });
        }
    };

    model.init();

    return model;

});
