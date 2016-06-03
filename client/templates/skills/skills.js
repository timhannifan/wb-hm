Template.skills.helpers({
	skills: function () {
		return Skills.find();
	}
});

Template.skills.events({
	'change [name=upload]': function( event, template ) {

	  Papa.parse( event.target.files[0], {
	    header: true,
	    complete: function( results, file ) {
	    	console.log(results.data);
	      Meteor.call( 'uploadSkills', results.data, function( error, response ) {
	        if ( error ) {
	          console.log( error.reason );
	        } else {
	          console.log('completed upload');
	        }
	      });
	    }
	  });

	},
	'click #exportDummyVars': function(event, template){
		event.preventDefault();
		
		Meteor.call('exportDummyVars', {},{}, function(error, response) {
			if (error) {
				console.log(error.reason);
			} else {
				console.log('received a resonse');
				let blob = Modules.client.convertBase64ToBlob( response );
				let filename = 'skills-download.zip';
				saveAs( blob, filename );
			}
		});

	}
});