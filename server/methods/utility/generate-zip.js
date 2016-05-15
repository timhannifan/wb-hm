Meteor.methods({
  generateZip() {
    try {
      return Modules.server.generateZip( {} );
    } catch ( exception ) {
      return exception;
    }
  }
});