
// includes
var http = require("http");
var url = require('url');
var fs = require("fs");
var res,req,message = "";


var hasError = false;
var errorMsg = "";


var getKeys = function(segments)
{
    return segments.splice( 3, segments.length - 2);
}

var getMap = function(keys) {
    var map = {};
    var arr = ['padding'];
    arr = arr.concat( keys );

    for( var i = 0; i < arr.length; i ++ )
    {
        if( i % 2 === 0 && i !== 0)
        {
            map[arr[i-1].toLowerCase()] = arr[i];
        }
    }
    return map;
};

var write = function ( data )
{
    message += data;
};
var terminateResponse = function()
{
        if( errorMsg.length > 0  )
        {
            res.writeHead(500,  {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });

        } else {
            writeHeaders(200);
            res.write( message );
        }
        message = "";
        errorMsg = "";

        var now = new Date().getTime();
        while(new Date().getTime() < now + 1500) {
            // simulate slow server
        }

        res.end();
};
var writeHeaders = function(code) {
    res.writeHead(code, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
};


var writeError = function( message )
{
    errorMsg += message;
};

/* just searching for property name/value match (simple search) */
var propertySearch = function( searchMap, modelName )
{
    try {

        var retValue = {};

        var fileJSON = require('./' + modelName + '.json');
        var hasMatch = false;

        //we assume its an array for now
        var jArray =  fileJSON.root;
        var jArrayLower = [];

        for( var i = 0; i < jArray.length; i++ ) {

            var item = jArray[i];
            var newItem = {};

            for (var prop in item) {
                newItem[prop.toLowerCase()] = item[prop];
            }
            jArrayLower.push(newItem);
        }


        //TODO: recursive multi-param search
        for( var i = 0; i < jArrayLower.length; i++ )
        {
            for( var p in searchMap )
            {
                if( searchMap.hasOwnProperty(p))
                {
                    // note the lack of type cohesion here
                    // makes searches work on any loose type

                    var foundValue = jArrayLower[i][p];
                    var searchValue = searchMap[p];

                    if( typeof(foundValue ) === 'string')
                    {
                        if( foundValue.toLowerCase() == searchValue.toLowerCase())
                        {
                            retValue = jArray[i];
                            hasMatch = true;
                        }

                    } else {

                        if( foundValue == searchValue)
                        {
                            retValue =  jArray[i] ;
                            hasMatch = true;
                        }
                    }


                }
            }
        }

        return [retValue];


    } catch(err) {
        writeError('error');
        writeError( err.message );
        writeError( 'request url :  ' + request.url);
    }
}



var writeJson = function(modelName)
{
    var fileJSON,jArray;

    try
    {
        fileJSON = require('./' + modelName + '.json');
        jArray =  fileJSON.root;

        write(JSON.stringify(jArray));
    }
    catch (err)
    {
        writeError("Problematic \n" + err.message );        
    }
}



http.createServer(function(request, response, next) {




    res = response;
    req = request;

    //stub for CORS browser security standards
    if( request.method === "OPTIONS")
    {
        terminateResponse();
    }

    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    var segments =  request.url.split('/');
    var modelName = segments[1].split('?')[0];
    var version =  request.url.split('/')[2];
    var reqBody = '';

    var pageSize = query["pagesize"];
    var startIndex = query["startindex"];

    if( request.method === 'GET') {

        var result;
        var keys = getKeys(segments);

        if( keys.length> 0 ){

            result = propertySearch( getMap(keys), modelName);

            write( JSON.stringify( result ));

            //filter search
            if( Object.keys(query).length > 1 )
            {
                // TODO: refine the search results
                // var filteredResult = filterSearch(query,result);
                // write( JSON.stringify( filteredResult ));
            }


        } else if( keys.length <=0 ){

            // just return the json
            writeJson( modelName, response);
        }

        terminateResponse();
    }


    request.on('data', function (chunk) {

        reqBody += chunk;
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (reqBody.length > 1e6) {
            request.connection.destroy();
        }
    });


    if( request.method === 'POST')
    {
        request.addListener('end', function () {
            POST( modelName, reqBody , response );
        });
    }

    if( request.method === 'PUT')
    {

        var id =  request.url.split('/')[3];

        request.addListener('end', function () {
            PUT( modelName, reqBody , id );
        });
    }

    if( request.method === 'DELETE')
    {
        DELETE( modelName, query , response );
    }


}).listen(8383);




var POST = function ( modelName, reqBody , response )
{
    try
    {
        var fileName = './' + modelName + '.json';
        var fileJSON = require(fileName);

        var modelJson = JSON.parse(reqBody);

        var jArray =  fileJSON.root;

        var data = {};
        data.root = jArray;


        modelJson.id = Math.round( Math.random() * 9999999 );

        data.root.push( modelJson );

        fs.writeFile( fileName, JSON.stringify( data ),function(err){
            if(err) {
                writeError("Problematic \n" + err.message );
            }
        });

        write( JSON.stringify(modelJson) );

    } catch ( err )
    {
        writeError("Problematic \n" + err.message );
    }

    terminateResponse();
};



var PUT = function ( modelName, reqBody , id )
{

    var fileName = './' + modelName + '.json';
    var fileJSON = require(fileName);

    var modelJson = JSON.parse(reqBody);


    try
    {
        var jArray =  fileJSON.root;
        var data = {};

        //search for node by id and update any properties
        for( var i = 0; i < jArray.length; i++ )
        {
            if( jArray[i].id == id )
            {
                for( var p in modelJson )
                {
                    jArray[i][p] = modelJson[p];
                }
            }
        }

        data.root = jArray;

        fs.writeFile( fileName, JSON.stringify( data ),function(err){
            if(err) {
                writeError("Problematic \n" + err.message );
            }
        });

        write( JSON.stringify(modelJson) );

    } catch ( err )
    {
        writeError("Problematic \n" + err.message );
    }

    terminateResponse();
};


var DELETE = function ( modelName, query , response )
{

    terminateResponse();
};

