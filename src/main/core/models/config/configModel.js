angular.module('FScapeApp.Models').factory('configModel',
    function(BaseModel, configService,$q){

    // let's just use this since the data is so small yet everything depends on it
    // no sense in making an async call here.
    var defaults =
    {
        "totalPages":820,
        "cdnVersion":"v12",
        "cdnPrefix":"http://d2zwcujesf1bgv.cloudfront.net/",
        "basePath":"prod/:version/images/",
        "pathThumbnail":"tiny_preload_size",
        "pathWebsize":"websize_1024",
        "license":null,
        "tileWidth": 1004,
        "tileHeight": 768,
        "startPage": 719
    };



    var model = new BaseModel(defaults, configService);

    model.getConfig = function()
    {
        var that = this;

        var deferred = $q.defer();
        if( that.data === null) {

            this.service.getConfig().then(function (result) {
                that.data = result.data;
                deferred.resolve(that.data);
            }, function( error ){
                that.data = fallback;
            });
        } else {
            deferred.resolve(this.data);
        }
        return deferred.promise;
    };

    return model;

});
