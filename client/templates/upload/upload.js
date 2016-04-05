Template.upload.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.upload.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  },
  uploads: function() {
    return Uploads.find().fetch();
  },
});

Template.upload.events({
  'change [name="uploadCSV"]': function( event, template ) {
  	template.uploading.set( true );

  	Papa.parse( event.target.files[0], {
  	  header: true,
  	  complete: function( results, file ) {
  	    Meteor.call( 'parseUploadRpt', results.data, function( error, response ) {
  	      if ( error ) {
  	        console.log( error.reason );
  	      } else {
  	        template.uploading.set( false );
  	        Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
  	      }
  	    });
  	  }
	  });
	}
});
