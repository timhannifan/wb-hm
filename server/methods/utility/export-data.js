Meteor.methods({
  exportData() {
    try {
      return Modules.server.exportData( {} );
    } catch ( exception ) {
      return exception;
    }
  }
});
