Meteor.methods({
    exportOptionsQuery: function (query, modifier) {
    check( query.collection, String );
    if (query.startDate){
        check( query.startDate, Date);        
    }
    if (query.endDate){
        check( query.endDate, Date);        
    }
    // check( query.endDate, Date);
    // check( query.collection, String );
    if (modifier.fields){
        check( modifier.fields, Object );    
    }
    

    var collection = query.collection;
    var passedQuery = {};
    var passedModifier = {
        fields: modifier.fields
    };

    if (query.startDate){
      passedQuery.createdAt = {$gte: query.startDate};
    }
    if (query.endDate){
      passedQuery.createdAt = {$lte: query.endDate};
    }

    console.log('METHOD: exportOptionsQuery on '+ query.collection);
    console.log(query);
    console.log(passedModifier);

    var asyncExportQuery = Meteor.wrapAsync(Modules.server.syncExportQuery),
    // result = asyncExportQuery(query, modifier, function( error, response ) {
    result = asyncExportQuery(collection,passedQuery,passedModifier, function( error, response ) {
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
