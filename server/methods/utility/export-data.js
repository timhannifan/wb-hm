Meteor.methods({
  exportData(limit,skip) {
  	check( limit, Number );
  	check( skip, Number );
    try {
      return Modules.server.exportData( {limit: limit, skip: skip} );
    } catch ( exception ) {
      return exception;
    }
  }  
});
