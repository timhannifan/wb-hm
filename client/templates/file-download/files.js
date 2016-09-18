// Template.files.onCreated( () => Template.instance().subscribe( 'batchDownloads' ) );

Template.files.helpers({
  files() {
    var files = BatchDownloads.find( {}, { sort: { "createdAt": -1 } } );
    if ( files ) {
      return files;
    }
  }
});

