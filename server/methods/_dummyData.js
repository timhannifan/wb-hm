Meteor.methods({
  submoduleDummyData(start,end) {
    this.unblock();

    check( start, Date );
    check( end, Date );

    var asyncModuleCall = Meteor.wrapAsync(Modules.server.submoduleDummyData),
      result = asyncModuleCall(start, end, function( error, response ) {
        if ( error ) {
          console.log(error);
          return new error(error);
        } else {
          // Handle response.
          console.log('submoduleDummyData result');
          // return result;
            return response;
        }
      });
  }  
});