angular.module('FScapeApp.Models').factory('gridModel',
    function(configModel, tileModel){

    var defaults =  [];

    var model = {

        gridBoxes:[],
        init: function () {

            var that = this;

            configModel.getConfig().then(function () {


                tileModel.getTiles().then( function(){


                for (var i = 0; i < 150; i++) {

                    var color = 0xff0000;
                    var startPage = configModel.data.startPage;

                    var rowOffset = 0;
                    var colOffset = 0;
                    var tileOffset = 0 + startPage;

                    if( i >= 50 && i < 100)
                    {
                        rowOffset = -9;
                        colOffset = 5;
                        color=0x00ff00;
                        tileOffset = -40 + startPage;
                    }
                    if( i >= 100 )
                    {
                        rowOffset = - 18;
                        colOffset = 10;
                        color=0x0000ff;
                        tileOffset = -80 + startPage;
                    }

                    var tileId = i + tileOffset;

                    if( tileId > configModel.data.totalPages)
                    {
                        tileId = Math.abs( tileId - configModel.data.totalPages );
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
                            currentTileId: tileId,

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
