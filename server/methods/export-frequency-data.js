Meteor.methods({
  exportSkillsdbFrequencyData(query, modifier) {
    this.unblock();

    check( query, Object );
    check( modifier, Object );

    var exportSkillsdbFrequencyData = Meteor.wrapAsync(Modules.server.exportSkillsdbFrequencyData),
      result = exportSkillsdbFrequencyData(query, modifier, function( error, response ) {
        if ( error ) {
          // Handle error.
          console.log(error)
        } else {
          // Handle response.
          console.log('exportSkillsdbFrequencyData result');
          console.log(result);
          return result;

        }
      });
    
    return result;
  }
});