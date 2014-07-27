angular.module('FScapeApp.Models').factory('WidgetModel',  function(BaseModel, WidgetService){

    var defaults = [{
        name: "John Doe"
    }];

    var model = new BaseModel(defaults, WidgetService);

    model.rateWidget = function(id, value){
        var that = this;
        return this.service.rateWidget(id,value).then( function(){
            that.setDataById( id, {rating:value} );
        });
    };

    // special getter for widgets adds a new property after loading
    model.getWidgetById = function(id){
        var that = this;
        return this.getById(id).then( function(result){
            that.data.name += "extra stuff";
            that.data.newProperty = "woo hoo";
        });
    };

    model.computeWidgetPrice = function(widget){
        return widget.price * widget.quantity;
    };

    // i haven't tested this yet, might have to change slightly
    model.mutateWidgetName= function(widget){
        var that = this;
        // can we do that.data[widget] = "mutatedName" instead?
        that.setDataById( widget.id, {name:"mutatedName"});
    };


    model.raiseTestHttpError = function()
    {
        return this.service.raiseTestHttpError ().then( function(){
           //
        });
    }


    return model;

});

/* This is only an example if you want instances of model definitions
 *
 *  See notes at http://angular-tips.com/blog/2013/08/understanding-service-types/
 *  under "Bonus 2: Creating new instances"
 *
 *   Our services are singleton but we can create a singleton factory that creates
 *   new instances. Before you dive deeper, keep in mind that having singleton services
 *   is the way to go and we don’t want to change that. Said that, in the rare cases you
 *   need to generate new instances, you can do that like this:
 *
 * */
function Widget(data){
    angular.extend( this, data);
}

Widget.prototype = {

    updateName: function(val)
    {
        // do some other stuff
        this.name = val;
    }

};

Widget.getById = function( id ) {
    // Do something to fetch a Person by the id
    return new Widget({
        name: "Jesus",
        lastName: "Christo"
    });
};