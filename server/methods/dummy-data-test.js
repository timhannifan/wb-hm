Meteor.methods({
  dummyDataTest(query, modifier) {
    //this.unblock();

    check( query, Object );
    check( modifier, Object );

    var dummyDataTest = Meteor.wrapAsync(Modules.server.dummyDataTest),
      result = dummyDataTest(query, modifier, function( error, response ) {
        if ( error ) {
          // Handle error.
          console.log(error)
          // return []
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