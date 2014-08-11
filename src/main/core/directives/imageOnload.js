app.directive('imageOnload', function(tileModel) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                var tileId =  attrs.numericId;



                if( tileId )
                {
                    tileModel.tiles[parseInt(tileId,0) ].isLoading = false;

                   // console.log("done loading " + tileId);

                }


                //element.parent().attr('isLoaded', true);
            });
        }
    };
});