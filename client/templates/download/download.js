Template.download.events({

	'click #js-csv-download': function(event) {
	  var nameFile = 'SourceItems.csv';
	  Meteor.call('download', function(err, fileContent) {
	    if(fileContent){
	      var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
	      saveAs(blob, nameFile);
	    }
	  });
	}

});