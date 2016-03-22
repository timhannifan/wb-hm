Template.export.events({

	'click #js-csv-download-monster': function(event) {
	  var nameFile = 'SourceItems.csv';
	  Meteor.call('download', function(err, fileContent) {
	    if(fileContent){
	      var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
	      saveAs(blob, nameFile);
	    }
	  });
	},
	'click #js-csv-download-jobstreet': function(event) {
	  var nameFile = 'JobStreet.csv';
	  Meteor.call('download', function(err, fileContent) {
	    if(fileContent){
	      var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
	      saveAs(blob, nameFile);
	    }
	  });
	}

});