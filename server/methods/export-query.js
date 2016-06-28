Meteor.methods({
    exportOptionsQuery: function (query, modifier) {
    check( query.collection, String );
    // check( modifier, Object );

    console.log('METHOD: exportOptionsQuery');
    // console.dir(query.collection);
    // console.dir(modifier);

    var asyncExportQuery = Meteor.wrapAsync(Modules.server.syncExportQuery),
    // result = asyncExportQuery(query, modifier, function( error, response ) {
    result = asyncExportQuery({collection: query.collection},{}, function( error, response ) {
      if ( error ) {
        // Handle error.
        console.log(error)
      } else {
        // Handle response.
        console.log('export options result');
        console.log(result);        
        return result;

      }
    });
    
    return result;
    }
});
