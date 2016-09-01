Template.wordFrequency.events({
	'click #js-bulk-description-export': function (event, template) {
		event.preventDefault();

		Meteor.call('jsBulkDescriptionExport',{},{}, function(error, response) {
		    if (error) {
		        console.log(error);
		    } else {
		        let blob = Modules.client.convertBase64ToBlob( response );
		        let filename = 'js-bulk-description-export.zip';
		        saveAs( blob, filename );
		    }
		});
	}
});

Template.wordFrequency.onCreated(function() {
 this.subscribe('JSNewDescTagsFrequency.all');
})

Template.wordFrequency.helpers({
	tableItems() {
	  let tableItems = JSNewDescTagsFrequency.find( {}, {	sort: {count: -1}, limit: 500} ).fetch();

	  if ( tableItems ) {
		  return tableItems.map(function(doc){
					  	return {word: doc.word, count: doc.count};
						  });
	  } else {
	  	return [];
	  }
	},
});