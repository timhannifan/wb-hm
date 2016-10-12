// Template.files.onCreated( () => Template.instance().subscribe( 'batchDownloads' ) );

Template.dummyFiles.helpers({
  files() {
    var files = DummyQueries.find( {}, { sort: { "createdAt": -1 } } );
    if ( files ) {
      return files;
    }
  },
  fileNameHelper(string) {
  	if (string) {
	  	return string.replace('/production/','');	
  	} else {
  		return string;
  	}
  	
  }
});

