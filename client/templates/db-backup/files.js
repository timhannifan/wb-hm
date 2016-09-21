// Template.files.onCreated( () => Template.instance().subscribe( 'batchDownloads' ) );

Template.files.helpers({
  files() {
    var files = BatchDownloads.find( {}, { sort: { "periodStart": 1 } } );
    if ( files ) {
      return files;
    }
  },
  fileNameHelper(string) {
  	return string.replace('/production/','');
  }
});

