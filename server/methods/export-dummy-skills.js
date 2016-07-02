Meteor.methods({
  exportDummyVars(query, modifier) {
    //this.unblock();

    check( query, Object );
    check( modifier, Object );

    var exportDummyVars = Meteor.wrapAsync(Modules.server.exportDummyVars),
      result = exportDummyVars(query, modifier, function( error, response ) {
        if ( error ) {
          // Handle error.
          console.log(error)
        } else {
          // Handle response.
          console.log('dummy vars result');
          console.log(result);
          return result;

        }
      });
    
    return result;
  }
});