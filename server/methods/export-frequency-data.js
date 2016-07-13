Meteor.methods({
  exportFrequencyData(query, modifier) {
    //this.unblock();

    check( query, Object );
    check( modifier, Object );

    var exportFrequencyData = Meteor.wrapAsync(Modules.server.exportFrequencyData),
      result = exportFrequencyData(query, modifier, function( error, response ) {
        if ( error ) {
          // Handle error.
          console.log(error)
        } else {
          // Handle response.
          console.log('exportFrequencyData result');
          console.log(result);
          return result;

        }
      });
    
    return result;
  }
});