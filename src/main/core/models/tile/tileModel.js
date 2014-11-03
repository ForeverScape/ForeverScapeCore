angular.module('FScapeApp.Models').factory('tileModel',
    function(BaseModel, tileService, configModel, generalUtils,$q){

    var defaults =  [];

    var model = new BaseModel(defaults, tileService);

    var cachedTilesPromise;

    model.tiles = [];

    model.getTiles = function()
    {
        var that = this;

        console.log(printStackTrace());

        return configModel.getConfig().then(function(){
            that.createTiles( );

            if( that.tiles  ) {
                that.cachedTilesPromise = $q.when(that.tiles);
            }

            if(! that.cachedTilesPromise )
            {
                that.cachedTilesPromise =  that.service.getTiles().then( function(result){
                    that.data = that.updateTileData( result.data );
                });
            }
            return that.cachedTilesPromise;
        });

    };

   model.updateTileData= function( data )
   {
       for( var i =0; i < configModel.data.totalPages; i++)
       {
           this.tiles[i].name = data.names[i];
       }
   }

    model.createTiles = function( data )
    {
        var tiles = [];

        var config = configModel.data;

        for( var i =0; i < configModel.data.totalPages; i++)
        {
            var tile = {
                id: i,
                index:i,
                row: Math.floor( i / 5),
                col: i % 5,
                name: "..",
                absoluteX:i * config.tileWidth,
                absoluteY:0,
                thumbUrl: generalUtils.path
                    .combine(
                        config.cdnPrefix,
                        config.basePath.replace(':version', config.cdnVersion),
                        config.pathThumbnail,
                        'forever_' + generalUtils.string.pad( i + 1, '0', 4) + '.jpg'
                    ),
                fullUrl: generalUtils.path
                    .combine(
                    config.cdnPrefix,
                    config.basePath.replace(':version', config.cdnVersion),
                    config.pathWebsize,
                        'forever_' + generalUtils.string.pad( i + 1, '0', 4) + '.jpg'
                )
            }

            tiles.push( tile );
        }

        this.tiles = tiles;

        return tiles;
    }


    return model;
});
