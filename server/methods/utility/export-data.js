Meteor.methods({
  exportData(limit,skip) {
    try {
      return Modules.server.exportData( {limit: limit, skip: skip} );
    } catch ( exception ) {
      return exception;
    }
  }
});
