Meteor.methods({
  exportData(options) {
  	check( options.limit, Number );
  	check( options.skip, Number );
    try {
      return Modules.server.exportData( {limit: options.limit, skip: options.skip} );
    } catch ( exception ) {
      return exception;
    }
  },
  exportDataSync(options) {
    console.log(options);
    check( options.limit, Number );
    check( options.skip, Number );

    var exportDataSync = Meteor.wrapAsync(Modules.server.exportDataSync),
    result = exportDataSync({limit: options.limit, skip: options.skip}, function( error, response ) {
    if ( error ) {
      // Handle error.
      console.log(error)
    } else {
      return result;
      // Handle response.
    }
  });

  return result;

  }, 
  exportDummyVars(query, modifier) {

    check( query, Object );
    check( modifier, Object );

    var exportDummyVars = Meteor.wrapAsync(Modules.server.exportDummyVars),
      result = exportDummyVars(query, modifier, function( error, response ) {
        if ( error ) {
          // Handle error.
          console.log(error)
        } else {
          // Handle response.
          return result;

        }
      });
    
    return result;
  }, 
  exportDataQuery(query,filter) {
    console.log('query', query);
    console.log('filter', filter);
    // check( options.limit, Number );
    // check( options.skip, Number );

    var exportDataSync = Meteor.wrapAsync(Modules.server.exportDataQuery),
    result = exportDataSync(query,filter, function( error, response ) {
      if ( error ) {
        // Handle error.
        console.log(error)
      } else {
        return result;
        // Handle response.
      }
    });

    return result;

  }, 
  exportBigZip() {
    	// console.log(options);
    	// check( options.limit, Number );
    	// check( options.skip, Number );

    	var exportBigZip = Meteor.wrapAsync(Modules.server.exportBigZip),
    	result = exportBigZip( function( error, response ) {
  	  if ( error ) {
  	    // Handle error.
  	    console.log(error)
  	  } else {
  	  	return result;
  	    // Handle response.
  	  }
  	});

  	return result;

  }  
});