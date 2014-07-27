

// Abstract model
angular.module('FScapeApp.Models').factory('BaseModel', function(){

    // note the data property on model!

    var Model = function(defaults, service){
        this.data = defaults;
        this.service = service;
    };

    Model.prototype.setDataById = function( id, data )
    {
        var self = this;
        for( var i = 0; i < self.data.length; i++)
        {
            if( self.data[i].id === id )
            {
                for( var prop in data )
                {
                    self.data[i][prop] = data[prop];
                }
            }
        }
    };

    Model.prototype.getById = function( id )
    {
        var self = this;
        return this.service.getBy("id",id).then( function(result){
            self.data = result.data


        });
    };


    Model.prototype.getAll = function(){
        var self = this;
        return this.service.getAll().then( function(result){
            self.data = result.data;
        });
    };

    Model.prototype.getBy = function(key,value){
        var self = this;
        return this.service.getBy(key,value).then( function(result){
            self.data = result.data;
        });
    };

    Model.prototype.add = function(value){
        var self = this;
        return this.service.add(value).then( function(result){
            value.id = result.data.id;
            self.data.push( value );
        });
    };

    return Model;
});