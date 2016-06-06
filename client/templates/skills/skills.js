Template.skills.helpers({
	rankedSkills: function () {
		var data = Skills.find({},{sort: {count: -1}});

		var reformattedArray = data.map(function(obj, index, cursor){ 
		   var rObj = {};
		   rObj.rank = index + 1;
		   rObj.keyword = obj.skill_keyword;
		   rObj.type = obj.type;
		   rObj.count = obj.count;
		   return rObj;
		});

		return reformattedArray;
	}
});

Template.skills.onRendered( () => {

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